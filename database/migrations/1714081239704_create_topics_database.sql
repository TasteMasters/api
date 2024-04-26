CREATE TABLE workshop_topics (
    id UUID PRIMARY KEY,
    workshop_id UUID REFERENCES workshops(id),
    title TEXT,
    estimated_time TEXT,
    description TEXT,
    video_link TEXT,
    completed BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
