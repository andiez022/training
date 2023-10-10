def handle_object(obj):
    for item in obj:
        if type(obj[item]) == str:
            obj[item] = obj[item].strip()
    return obj

def remove_fields(obj, fields):
    for field in fields:
        if field in obj:
            del obj[field]
    return obj