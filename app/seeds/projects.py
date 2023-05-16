from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text



def seed_projects():
    capstone = Project(
        title='Capstone', user_id=1)
    group_clone = Project(
        title='Quora Group Project', user_id=1)
    solo_clone = Project(
        title='AirBnB Clone', user_id=1)
    capstone2 = Project(
        title='Capstone', user_id=2)
    group_clone2 = Project(
        title='Spotify Group Project', user_id=2)
    solo_clone2 = Project(
        title='MeetUp Clone', user_id=2)
    capstone3 = Project(
        title='Capstone', user_id=3)
    group_clone3 = Project(
        title='Spotify Group Project', user_id=3)
    solo_clone3 = Project(
        title='AirBnB Clone', user_id=3)

    db.session.add(capstone)
    db.session.add(group_clone)
    db.session.add(solo_clone)
    db.session.add(capstone2)
    db.session.add(group_clone2)
    db.session.add(solo_clone2)
    db.session.add(capstone3)
    db.session.add(group_clone3)
    db.session.add(solo_clone3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
