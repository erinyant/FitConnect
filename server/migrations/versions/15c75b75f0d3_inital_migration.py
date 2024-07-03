"""inital migration

Revision ID: 15c75b75f0d3
Revises: 
Create Date: 2024-07-03 08:28:59.751409

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '15c75b75f0d3'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('gyms',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('website', sa.String(), nullable=True),
    sa.Column('category', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_gyms')),
    sa.UniqueConstraint('name', name=op.f('uq_gyms_name'))
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('phone_number', sa.String(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('zipcode', sa.Integer(), nullable=True),
    sa.CheckConstraint('length(phone_number) = 10 or length(phone_number) = 12 or length(phone_number) = 15 or length(phone_number) = 17', name=op.f('ck_users_phone_number_length')),
    sa.CheckConstraint('length(username) > 4', name=op.f('ck_users_username_length_over_four')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_users')),
    sa.UniqueConstraint('username', name=op.f('uq_users_username'))
    )
    op.create_table('workouts',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('category', sa.String(), nullable=False),
    sa.Column('dates', sa.String(), nullable=True),
    sa.Column('time', sa.String(), nullable=True),
    sa.Column('gym_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['gym_id'], ['gyms.id'], name=op.f('fk_workouts_gym_id_gyms')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_workouts_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_workouts'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('workouts')
    op.drop_table('users')
    op.drop_table('gyms')
    # ### end Alembic commands ###