"""Create persons table

Revision ID: 0882cd386115
Revises: 
Create Date: 2023-04-11 10:23:19.346043

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0882cd386115'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "persons",
        sa.Column("id", sa.Integer, primary_key=True, index=True),
        sa.Column("full_name", sa.String, index=True),
        sa.Column("date_of_birth", sa.String, index=True),
        sa.Column("nationality", sa.String, index=True),
    )


def downgrade():
    op.drop_table("persons")
