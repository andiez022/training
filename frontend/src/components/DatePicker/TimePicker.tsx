import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { isAndroid, isIos } from '../../common/utils/detect';
import Button, { ButtonType } from '../Button/Button';
import Dropdown from '../Dropdown/Dropdown';
import Icon, { ICONS } from '../SVG/Icon';
import TextInput from '../TextInput/TextInput';

const hour = Array.from(Array(12).keys()).map((i) => (i + 1).toString().padStart(2, '0'));
const minute = Array.from(Array(60).keys()).map((i) => i.toString().padStart(2, '0'));
const period = ['AM', 'PM'];

export interface TimePickerProps {
  classes?: string;
  label?: string;
  name?: string;
  error?: string;
  value?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
}

const TimePicker: React.FC<TimePickerProps> = ({ classes, label, name, error, value, onChange, disabled = false }) => {
  const { t } = useTranslation();

  const [currentTimeStr, setCurrentTimeStr] = useState(value);
  const [currentTime, setCurrentTime] = useState<any>({ hour: undefined, minute: undefined, period: undefined });

  const [h, m] = useMemo(
    () =>
      dayjs(`01/01/1970 ${value || '01:00'}`)
        .format('hh:mm:A')
        .split(':'),
    [value],
  );

  const generateClasses = (isActive: boolean = false) => classNames('time-picker__item', { 'time-picker__item--active': isActive });

  const onSelect = (key: string, value: string) => {
    setCurrentTime({ ...currentTime, [key]: value });
  };

  const setValue = (value: { h: string; m: string }) => {
    setCurrentTime({
      hour: Number(value.h) > 12 ? (Number(value.h) - 12).toString().padStart(2, '0') : value.h,
      minute: value.m,
      period: Number(value.h) > 12 ? 'PM' : 'AM',
    });
  };

  useEffect(() => {
    if (currentTime.hour && currentTime.minute && currentTime.period) {
      const format = `${currentTime.hour}:${currentTime.minute} ${currentTime.period}`;
      setCurrentTimeStr(dayjs(`01/01/1970 ${format}`).format('HH:mm'));
    }
  }, [currentTime]);

  useEffect(() => {
    if (value) {
      const [h, m] = value.split(':');
      setValue({ h, m });
    }
  }, [!!value]);

  useEffect(() => {
    if (currentTimeStr && onChange) {
      onChange(currentTimeStr);
    }
  }, [currentTimeStr]);

  return (
    <div className={classes}>
      {disabled ? (
        <TextInput
          dataId="timePicker.input"
          type="time"
          label={label}
          value={currentTimeStr}
          name={name}
          error={error}
          endAdornment={
            <div className="time-picker__clear">
              <Icon component={ICONS.TIMES} />
            </div>
          }
        />
      ) : (
        <Dropdown
          elementAction={
            <TextInput
              onChange={(e) => {
                const [h, m] = dayjs(`01/01/1970 ${e.target.value || '01:00'}`)
                  .format('hh:mm:A')
                  .split(':');
                setValue({ h, m });
                setCurrentTimeStr(e.target.value);
              }}
              dataId="timePicker.input"
              type="time"
              label={label}
              value={currentTimeStr}
              name={name}
              error={error}
              endAdornment={
                <div className="time-picker__clear">
                  <Icon component={ICONS.TIMES} />
                </div>
              }
            />
          }
          placement="bottom"
          offset={[0, 0]}
          disabled={disabled}
        >
          {isAndroid() || isIos() ? (
            <div />
          ) : (
            ({ onClose }) => (
              <div className="time-picker__content">
                <Swiper className="time-picker__hour" slidesPerView={7} loop direction="vertical" initialSlide={Number(h) - 1}>
                  {hour.map((h) => (
                    <SwiperSlide key={h}>
                      <div className={generateClasses(h === currentTime.hour)} onClick={() => onSelect('hour', h)}>
                        {h}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper className="time-picker__minute" slidesPerView={7} loop direction="vertical" initialSlide={Number(m)}>
                  {minute.map((m) => (
                    <SwiperSlide key={m}>
                      <div className={generateClasses(m === currentTime.minute)} onClick={() => onSelect('minute', m)}>
                        {m}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper className="time-picker__period" slidesPerView={7} direction="vertical">
                  <div>
                    {period.map((p) => (
                      <SwiperSlide key={p}>
                        <div className={generateClasses(p === currentTime.period)} onClick={() => onSelect('period', p)}>
                          {p}
                        </div>
                      </SwiperSlide>
                    ))}
                  </div>
                  <Button onClick={onClose} buttonType={ButtonType.Primary}>
                    {t('common.text.done')}
                  </Button>
                </Swiper>
              </div>
            )
          )}
        </Dropdown>
      )}
    </div>
  );
};

export default TimePicker;
