#!/usr/bin/env python3

from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import User, Gym, Workout


@app.before_request
def check_log_status():
    open_access_list = [
        'signup',
        'login',
        'check_session'
    ]
    if request.endpoint not in open_access_list and (not session.get('user_id')):
        return make_response({"error": "401 Unauthorized"}, 401)

class Home(Resource):
    def get(self):
        all_workouts = []
        for workout in Workout.query.all():
            all_workouts.append(workout.to_dict())
        return make_response(all_workouts)

class Login(Resource):
    def post(self):
        params= request.json
        user = User.query.filter(User.username == params.get('username')).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        if user.authenticate(params.get('password')):
            session['user_id'] = user.id
            return make_response(user.to_dict())
        else:
            return make_response({"error": "Invalid password"}, 401)

class Logout(Resource):
    def delete(self):
        print("trying to logout")
        session.pop('user_id', None)
        return make_response({}, 204)
    
class CheckSession(Resource):
    def get(self):
        if 'user_id' in session:
            user_id = session['user_id']
            if user_id:
                user = db.session.get(User, user_id)
                if user:
                    return make_response(user.to_dict(), 200)
        return make_response({"error": "Unauthorized: Must login"}, 401)

class Signup(Resource):
    def post(self):
        params = request.get_json()
        print(params)
        username = params.get('username')
        password = params.get('password')
        first_name = params.get('firstName')
        last_name= params.get('lastName')
        email = params.get('email')
        phone_number = params.get('phoneNumber')
        zipcode = params.get('zipCode')
        print(first_name)
        
        user = User(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            phone_number = phone_number,
            zipcode = zipcode
        )
        user.password_hash = password
        
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except IntegrityError as e:
            print(e)
            return make_response({"error": "422 Unprocessable Entity", "details": str(e)}, 422)

class Workouts(Resource):
    def get(self):
        workouts = Workout.query.all()
        workout_list = [workout.to_dict() for workout in workouts]
        return make_response(workout_list, 200)

    def post(self):
        data = request.json
        try: 
            workout = Workout(
                title = data['title'],
                description = data['description'],
                category = data['category'],
                dates = data['dates'],
                time = data['time'],
                gym_id = data['gym_id']
            )
            db.session.add(workout)
            db.session.commit()
            return make_response(workout.to_dict(), 201)
        except Exception as e:
            app.logger.error(f"Error creating workout: {e}")
            return make_response({"error": "Could not create Workout", "details": str(e)}, 400)

class WorkoutById(Resource):
    def get(self, id):
        workout = db.session.get(Workout, id)
        if workout:
            return make_response(workout.to_dict(), 200)
        else:
            return make_response({'error': 'Workout not found'}, 404)
        
    def patch(self, id):
          workout = db.session.get(Workout, id)
          if workout:
            params = request.json
            for attr in params:
                setattr(workout , attr, params[attr])
            db.session.commit()
            return make_response(workout.to_dict())
              
    def delete(self, id):
        workout = db.session.get(Workout, id)
        if workout:
            db.session.delete(workout)
            db.session.commit()
            return make_response({"message": "Workout successfully deleted"}, 204)
        else:
            return make_response({"error": "Gym not found"}, 404)

class Gyms(Resource):
    def get(self):
        gyms = Gym.query.all()
        gym_list = [gym.to_dict() for gym in gyms]
        return make_response(gym_list, 200)
    
    def post(self):
        data = request.json
        try: 
            gym = Gym(
                name = data['name'],
                website = data['website'],
                category = data['category'],
            )
            db.session.add(gym)
            db.session.commit()
            return make_response(gym.to_dict(), 201)
        except Exception as e:
            app.logger.error(f"Error creating gym: {e}")
            return make_response({"error": "Could not create Gym", "details": str(e)}, 400)

class GymById(Resource):
    def get(self, id):
        gym = db.session.get(Gym, id)
        if gym:
            return make_response(gym.to_dict(), 200)
        else:
            return make_response({'error': 'Gym not found'}, 404)
        
    def patch(self, id):
        gym = db.session.get(Gym, id)
        if gym:
            params = request.json
            for attr in params:
                setattr(gym , attr, params[attr])
            db.session.commit()
            return make_response(gym.to_dict())
    
    def delete(self, id):
        gym = db.session.get(Gym, id)
        if gym:
            db.session.delete(gym)
            db.session.commit()
            return make_response({"message": "Gym deleted successfully."}, 204)
        else:
            return make_response({"error": "Gym not found"}, 404)

class Users(Resource):
    def get(self):
        users = User.query.all()
        user_list = [user.to_dict() for user in users]
        return make_response(user_list, 200)

    def post(self):
        params = request.get_json()
        
        username = params.get('username')
        password = params.get('password')
        first_name = params.get('first_name')
        last_name= params.get('last_name')
        email = params.get('email')
        phone_number = params.get('phone_number')
        zipcode = params.get('zipcode')
        
        user = User(
            username = username,
            first_name = first_name,
            last_name = last_name,
            email = email,
            phone_number = phone_number,
            zipcode = zipcode
        )
        user.password_hash = password
        
        try:
            db.session.add(user)
            db.session.commit()
            session['user_id'] = user.id
            return make_response(user.to_dict(), 201)
        except IntegrityError:
            return make_response({"error": "422 Unprocessable Entity"}, 422)

class UserById(Resource):
    def get(self, id):
        user = db.session.get(User, id)
        if user:
            return make_response(user.to_dict(), 200)
        else:
            return make_response({'error': 'User not found'}, 404)
        
    def patch(self, id):
        user = db.session.get(User, id)
        if user:
            params = request.json
            for attr in params:
                setattr(user , attr, params[attr])
            db.session.commit()
            return make_response(user.to_dict())
    
    def delete(self, id):
        user = db.session.get(User, id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response({"message": "User deleted successfully."}, 204)
        else:
            return make_response({"error": "User not found"}, 404)


api.add_resource(Home, '/home')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')
api.add_resource(Login, '/login')
api.add_resource(Signup, '/signup')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(Workouts, '/workouts')
api.add_resource(WorkoutById, '/classes/<int:id>')
api.add_resource(Users, '/user')
api.add_resource(UserById, '/user/<int:id>')
api.add_resource(Gyms, '/gyms')
api.add_resource(GymById, '/gyms/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

