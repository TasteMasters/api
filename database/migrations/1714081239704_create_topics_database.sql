CREATE TABLE IF NOT EXISTS workshop_topics (
    id UUID PRIMARY KEY,
    workshop_id UUID REFERENCES public.workshops(id) ON DELETE CASCADE,
    title TEXT,
    estimated_time TEXT,
    description TEXT,
    video_link TEXT,
    completed BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
