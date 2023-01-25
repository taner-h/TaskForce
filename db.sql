CREATE TABLE sub_tier ( 
	sub_tier_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(64)
);

CREATE TABLE project_type ( 
	project_type_id SERIAL PRIMARY KEY NOT NULL,
	type VARCHAR(64)
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY NOT NULL,
    email VARCHAR(64) NOT NULL,
    password VARCHAR(64) NOT NULL,
    name VARCHAR(32) NOT NULL,
    surname VARCHAR(32) NOT NULL,
    linkedin VARCHAR(100),
    github VARCHAR(100),
	bio VARCHAR(300),
	portfolio VARCHAR(100),
	credit_count SMALLINT NOT NULL,
	match_credit SMALLINT NOT NULL,
    create_time TIMESTAMP NOT NULL,
    sub_tier_id SERIAL NOT NULL REFERENCES sub_tier(sub_tier_id),
    UNIQUE(email)
);

CREATE TABLE project (
	project_id SERIAL PRIMARY KEY NOT NULL,
	creator_id SERIAL REFERENCES users(user_id),
	name VARCHAR(100) NOT NULL,
	description VARCHAR(3000) NOT NULL,
	summary VARCHAR(500),
	repo VARCHAR(100),
	credit_count SMALLINT NOT NULL,
    create_time TIMESTAMP NOT NULL,
    member_count INTEGER,
	project_type_id SERIAL REFERENCES project_type(project_type_id)
);

CREATE TABLE field (
	field_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(64)
);

CREATE TABLE skill (
	skill_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(64)
);

CREATE TABLE user_field (
	user_id SERIAL NOT NULL REFERENCES users(user_id),
    field_id SERIAL NOT NULL REFERENCES field(field_id),
    PRIMARY KEY(user_id, field_id)
);

CREATE TABLE user_skill (
	user_id SERIAL NOT NULL REFERENCES users(user_id),
    skill_id SERIAL NOT NULL REFERENCES skill(skill_id),
    PRIMARY KEY(user_id, skill_id)
);


CREATE TABLE tag ( 
	tag_id SERIAL PRIMARY KEY NOT NULL,
	name VARCHAR(64)
);

CREATE TABLE project_tag (
	project_id SERIAL NOT NULL REFERENCES project(project_id),
    tag_id SERIAL NOT NULL REFERENCES tag(tag_id),
    PRIMARY KEY(project_id, tag_id)
);

CREATE TABLE resource (
	resource_id SERIAL PRIMARY KEY NOT NULL,
	project_id SERIAL NOT NULL REFERENCES project(project_id),
	title VARCHAR(100),
	link VARCHAR(100) NOT NULL
);

CREATE TABLE application (
	project_id SERIAL NOT NULL REFERENCES project(project_id),
    user_id SERIAL NOT NULL REFERENCES users(user_id),
    credit_count SMALLINT,
    application_time TIMESTAMP NOT NULL,
    PRIMARY KEY(project_id, user_id)
);

CREATE TABLE member (
	project_id SERIAL NOT NULL REFERENCES project(project_id),
    user_id SERIAL NOT NULL REFERENCES users(user_id),
    member_time TIMESTAMP NOT NULL,
    PRIMARY KEY(project_id, user_id)
);

CREATE TABLE invite (
	project_id SERIAL NOT NULL REFERENCES project(project_id),
    user_id SERIAL NOT NULL REFERENCES users(user_id),
    invite_time TIMESTAMP NOT NULL,
    PRIMARY KEY(project_id, user_id)
);

CREATE TABLE request (
	project_id SERIAL NOT NULL REFERENCES project(project_id),
    user_id SERIAL NOT NULL REFERENCES users(user_id),
    request_time TIMESTAMP NOT NULL,
    PRIMARY KEY(project_id, user_id)
);

CREATE TABLE task (
	task_id SERIAL PRIMARY KEY NOT NULL,
	creator_id SERIAL REFERENCES users(user_id),
	title VARCHAR(160) NOT NULL,
	description VARCHAR(2000) NOT NULL,
	repo VARCHAR(100),
    credit_count SMALLINT,
    credit_reward SMALLINT,
    answer_count INTEGER,
    commit_count INTEGER,
    create_time TIMESTAMP NOT NULL
);

CREATE TABLE commit (
	task_id SERIAL NOT NULL REFERENCES task(task_id),
    user_id SERIAL NOT NULL REFERENCES users(user_id),
    commit_time TIMESTAMP NOT NULL
    PRIMARY KEY(task_id, user_id)
);

CREATE TABLE answer (
	answer_id SERIAL PRIMARY KEY NOT NULL,
	task_id SERIAL NOT NULL REFERENCES task(task_id),
    responder_id SERIAL NOT NULL REFERENCES users(user_id),
    repo VARCHAR(100),
    answer VARCHAR(10000) NOT NULL,
    points SMALLINT NOT NULL,
    create_time TIMESTAMP NOT NULL
);

CREATE TABLE comment (
	comment_id SERIAL PRIMARY KEY NOT NULL,
	answer_id SERIAL NOT NULL REFERENCES answer(answer_id),
    user_id SERIAL NOT NULL REFERENCES users(user_id),
    comment VARCHAR(2000) NOT NULL,
    create_time TIMESTAMP NOT NULL
);

CREATE TABLE project_field (
	project_id SERIAL NOT NULL REFERENCES project(project_id),
    field_id SERIAL NOT NULL REFERENCES field(field_id),
    PRIMARY KEY(project_id, field_id)
);

CREATE TABLE project_skill (
	project_id SERIAL NOT NULL REFERENCES project(project_id),
    skill_id SERIAL NOT NULL REFERENCES skill(skill_id),
    PRIMARY KEY(project_id, skill_id)
);

CREATE TABLE task_field (
	task_id SERIAL NOT NULL REFERENCES task(task_id),
    field_id SERIAL NOT NULL REFERENCES field(field_id),
    PRIMARY KEY(task_id, field_id)
);

CREATE TABLE task_skill (
	task_id SERIAL NOT NULL REFERENCES task(task_id),
    skill_id SERIAL NOT NULL REFERENCES skill(skill_id),
    PRIMARY KEY(task_id, skill_id)
);

CREATE TABLE task_tag (
	task_id SERIAL NOT NULL REFERENCES task(task_id),
    tag_id SERIAL NOT NULL REFERENCES tag(tag_id),
    PRIMARY KEY(task_id, tag_id)
);

CREATE TABLE match_project (
	project_id SERIAL NOT NULL REFERENCES project(project_id),
    user_id SERIAL NOT NULL REFERENCES users(user_id),
    match_time TIMESTAMP NOT NULL,
    PRIMARY KEY(project_id, user_id)
);

CREATE TABLE match_task (
	task_id SERIAL NOT NULL REFERENCES task(task_id),
    user_id SERIAL NOT NULL REFERENCES users(user_id),
    match_time TIMESTAMP NOT NULL,
    PRIMARY KEY(task_id, user_id)
);

CREATE TABLE notification (
	notification_id SERIAL PRIMARY KEY NOT NULL,
	owner_id SERIAL NOT NULL REFERENCES users(user_id),
	causer_id SERIAL NOT NULL REFERENCES users(user_id),
	type VARCHAR(32) NOT NULL,
    action VARCHAR(32) NOT NULL,
    object_id SERIAL NOT NULL,
    object_name VARCHAR(64) NOT NULL,
    is_seen BOOLEAN NOT NULL,
    create_time TIMESTAMP NOT NULL
);
