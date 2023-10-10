"""add-author-column-to-content-model

Revision ID: ef92ad008d0a
Revises: 1baf358a85d5
Create Date: 2023-06-06 15:14:20.363180

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ef92ad008d0a'
down_revision = '1baf358a85d5'
branch_labels = None
depends_on = None


def upgrade() -> None:
    with op.get_context().autocommit_block():
        op.add_column('content', sa.Column('author',
                                           sa.String, nullable=False, server_default='author'))


def downgrade() -> None:
    with op.get_context().autocommit_block():
        op.drop_column('content', 'author')
