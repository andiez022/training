"""Drop image-column of living-lab table

Revision ID: 1baf358a85d5
Revises: ffa5fcadbaa2
Create Date: 2023-06-06 14:59:03.145062

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1baf358a85d5'
down_revision = 'ffa5fcadbaa2'
branch_labels = None
depends_on = None


def upgrade() -> None:
    with op.get_context().autocommit_block():
        op.drop_column('living_lab', 'image')


def downgrade() -> None:
    with op.get_context().autocommit_block():
        op.add_column('living_lab', sa.Column('image',
                                              sa.String(), nullable=False, server_default=''))
