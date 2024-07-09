from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from flask_bcrypt import Bcrypt

from config import db, app
bcrypt = Bcrypt(app)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    serialize_rules = ('-_password_hash',)

    __table_args__ = (
        db.CheckConstraint('length(username) > 4', name='username_length_over_four'), db.CheckConstraint('length(phone_number) = 10 or length(phone_number) = 12 or length(phone_number) = 15 or length(phone_number) = 17', name='phone_number_length'),
    ) 

    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String, nullable = False)
    last_name=db.Column(db.String, nullable = False)
    email=db.Column(db.String, nullable=False)
    phone_number= db.Column(db.String, nullable=False)
    username=db.Column(db.String, unique=True, nullable=False)
    _password_hash=db.Column(db.String, nullable=False)
    zipcode=db.Column(db.Integer)

    workouts = db.relationship('Workout', back_populates='user', cascade='all, delete-orphan')
    gyms = association_proxy('workouts', 'gym')

    @property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    @validates('first_name')
    def validates_first_name(self, key, new_f_name):
        if not new_f_name:
            raise ValueError("Name is required")
        return new_f_name
    
    @validates('last_name')
    def validates_last_name(self, key, new_l_name):
        if not new_l_name:
            raise ValueError("Last name is required")
        return new_l_name
    
    @validates('email')
    def validates_email(self, key, new_email):
        if not new_email:
            raise ValueError("Email is required")
        if '@' not in new_email:
            raise ValueError("Email must contain the @ symbol")
        if len(new_email) < 8:
            raise ValueError("Must be valid email address")
        return new_email
    
    @validates('phone_number')
    def validates_phone_number(self, key, new_phone_number):
        if not new_phone_number:
            raise ValueError("Phone number is required")
        if not (len(new_phone_number) == 10 or len(new_phone_number) == 12 or len(new_phone_number) == 15 or len(new_phone_number) == 17):
            raise ValueError("Must be a valid phone number")
        return new_phone_number

    @validates('username')
    def validates_username(self, key, new_username):
        if not new_username:
            raise ValueError("Username is required")
        if len(new_username) < 4:
            raise ValueError("Username must be longer than 4 characters")
        if User.query.filter_by(username=new_username).first():
            raise ValueError("Username must be unique")
        return new_username

    @validates('_password_hash')
    def validates_password(self, key, new_password):
        SpecialChar =['$', '@', '#', '%', '?', '!', '&', '^', '*', '<', '>']
        if not new_password:
            raise ValueError("Must have a password")
        if len(new_password) < 8:
            raise ValueError("Password must be longer than 8 characters")
        if not any(char.isdigit() for char in new_password):
            raise ValueError('Password should have at least one numeral')
        if not any(char in SpecialChar for char in new_password):
            raise ValueError("Password should have at least one of the symbols !?$@#&^*<>")
        return new_password

class Gym(db.Model, SerializerMixin):
    __tablename__='gyms'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, unique=True, nullable=False)
    website=db.Column(db.String)
    category=db.Column(db.String)
    
    workouts = db.relationship('Workout', back_populates='gym', cascade='all, delete-orphan')
    users=association_proxy('workouts', 'user')

    def __repr__(self):
        return f"<Gym {self.id}: {self.name}, {self.website}, {self.category}>"
    
    @validates('name')
    def validates_name(self, key, new_name):
        if not new_name:
            raise ValueError("Name is required")
        return new_name

class Workout(db.Model, SerializerMixin):
    __tablename__='workouts' 

    serialize_rules = ('-gym.workouts', '-user.workouts',)

    id=db.Column(db.Integer, primary_key=True)
    title=db.Column(db.String, nullable=False)
    description=db.Column(db.String, nullable=False)
    category=db.Column(db.String, nullable=False)
    dates=db.Column(db.String)
    time=db.Column(db.String)
    gym_id=db.Column(db.Integer, db.ForeignKey('gyms.id'), nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', back_populates='workouts')
    gym = db.relationship('Gym', back_populates='workouts')

    def __repr__(self):
        return f"<Workout {self.id}: {self.title}, {self.description}, {self.category}, {self.dates}, {self.time}>"
