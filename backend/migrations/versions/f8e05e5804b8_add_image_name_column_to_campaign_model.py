"""add-image-name-column-to-campaign-model

Revision ID: f8e05e5804b8
Revises: ef92ad008d0a
Create Date: 2023-06-09 12:00:23.744283

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f8e05e5804b8'
down_revision = 'ef92ad008d0a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    with op.get_context().autocommit_block():
        op.add_column('campaign', sa.Column('image_name',
                                            sa.String, nullable=False, server_default='image_name'))


def downgrade() -> None:
    with op.get_context().autocommit_block():
        op.drop_column('campaign', 'image_name')
