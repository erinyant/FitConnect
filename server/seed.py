#!/usr/bin/env python3

from random import randint, choice as rc
from faker import Faker
from flask import request, make_response
from config import db, app
from models import Workout, Gym, User

fake = Faker()

def generate_phone_number():
    allowed_lengths = [10, 12, 15, 17]
    length = rc(allowed_lengths)
    return "".join([str(randint(0, 9)) for _ in range(length)])
    
def create_users():
    print("Creating users...")
    users = []
    list_of_domains = ('com', 'com.br', 'net', 'net.br', 'org', 'org.br', 'gov', 'gov.br')
    for _ in range(10):
        first_name = fake.first_name()
        last_name = fake.last_name()
        company = fake.company().split()[0].strip(',')
        dns_org = rc(list_of_domains)
        email = f"{first_name}.{last_name}@{company}.{dns_org}".lower()
        u = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            phone_number=generate_phone_number(),
            username=fake.user_name().ljust(8,"1"),
            _password_hash=fake.password()+'!',
            zipcode=fake.zipcode()
        )
        users.append(u)
    return users
   
def create_gyms():
    print("Creating gyms...")
    gyms = []
    categories = ['General', 'Yoga', 'Pilates', 'Cycling', 'Kickboxing', 'Cross Fit']
    for _ in range(10):
        name = fake.unique.company()
        g = Gym(
        name = name,
        website = fake.url(),
        category = rc(categories),
        )
        gyms.append(g)
    return gyms



def create_workouts(gyms,users):
    print("Creating workouts...")
    workouts = []
    titles=[]
    categories = ['General', 'Yoga', 'Pilates', 'Cycling', 'Kickboxing', 'Cross Fit']
    for _ in range(10):
        title = fake.unique.job()
        w = Workout(
        title = title,
        description = fake.paragraph(),
        category = rc(categories),
        dates=fake.date_between(start_date='-1y', end_date='today').strftime("%m/%d/%Y"),
        # time=fake.date_between(start_time='-1y', end_date='today').strftime("%m/%d/%Y")+" "+fake.date_between(start_date='-1y', end_date='today').strftime("%m/%d/%Y"),
        gym_id=rc([gym.id for gym in gyms]),
        user_id=rc([user.id for user in users])
        )
        workouts.append(w)
    return workouts


def clear_database():
    with app.app_context():
        print("Deleting all records...")
        Workout.query.delete()
        Gym.query.delete()
        User.query.delete()
        db.session.commit()

def seed_database():
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Gym.query.delete()
        Workout.query.delete()
    
        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()
        
        print("Seeding gyms...")
        gyms = create_gyms()
        db.session.add_all(gyms)
        db.session.commit()
        
        print("Seeding workouts...")
        workouts = create_workouts(gyms, users)
        db.session.add_all(workouts)
        db.session.commit()
        
if __name__ == '__main__':
    seed_database()