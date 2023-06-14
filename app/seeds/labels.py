from app.models import db, Label, environment, SCHEMA
from sqlalchemy.sql import text


def seed_labels():
    in_progress = Label(
        title="In Progress", user_id=1
    )
    completed = Label(
        title="Completed", user_id=1
    )
    behind_schedule = Label(
        title="Behind Schedule", user_id=1
    )

    db.session.add(in_progress)
    db.session.add(completed)
    db.session.add(behind_schedule)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the labels table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_labels():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.labels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM labels"))

    db.session.commit()
