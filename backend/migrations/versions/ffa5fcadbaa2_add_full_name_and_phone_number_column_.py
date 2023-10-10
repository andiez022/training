"""add full_name and phone_number column to user table 

Revision ID: ffa5fcadbaa2
Revises: 
Create Date: 2023-05-31 12:48:54.722328

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ffa5fcadbaa2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    with op.get_context().autocommit_block():
        op.add_column('user', sa.Column('phone_number',
                                        sa.String(length=20), nullable=False, server_default='0123456789'))
        op.add_column('user', sa.Column('full_name',
                                        sa.String(length=100), nullable=False, server_default='Admin'))
        op.alter_column('user', 'role', type_=sa.Enum(
            'Admin', 'Normal', name='role'))
        op.add_column('living_lab', sa.Column('author',
                                              sa.String, nullable=False, server_default='author'))


def downgrade() -> None:
    with op.get_context().autocommit_block():
        op.drop_column('user', 'phone_number')
        op.drop_column('user', 'full_name')
        op.alter_column('user', 'role', type_=sa.Enum(
            'Admin', 'Normal', 'Anonymous', name='role'))
        op.drop_column('living_lab', 'author')
