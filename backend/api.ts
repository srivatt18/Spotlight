import { db } from 'backend/db';
import { v4 as uuid } from 'uuid';

export async function add_media(title: string, age_rating: string, genre: string, lang: string, is_movie: boolean) {
    let statment = db.prepare("INSERT INTO media (?, ?, ?, ?, ?, 0, 0, 0, ?)");
    statment.run(
        uuid(),
        title,
        age_rating,
        genre,
        lang,
        is_movie ? 1 : 0
    );
}

export async function get_media(uuid: string) {
    let results = JSON.stringify(db.prepare("SELECT * FROM media WHERE uuid = ?").all(uuid));
    console.log(results);
    return results
}

export async function del_media(uuid: string) {
    db.prepare("DELETE FROM media WHERE uuid = ?").run(uuid);
}