# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_12_10_231826) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "albums", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "artist_id", null: false
    t.integer "year", null: false
    t.string "genre", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo_url"
    t.index ["artist_id", "title"], name: "index_albums_on_artist_id_and_title", unique: true
    t.index ["artist_id"], name: "index_albums_on_artist_id"
    t.index ["photo_url"], name: "index_albums_on_photo_url"
  end

  create_table "artists", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "photo_url"
    t.integer "num_listeners", null: false
    t.index ["name"], name: "index_artists_on_name"
    t.index ["photo_url"], name: "index_artists_on_photo_url"
  end

  create_table "collabs", force: :cascade do |t|
    t.integer "song_id", null: false
    t.integer "artist_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_collabs_on_artist_id"
    t.index ["song_id", "artist_id"], name: "index_collabs_on_song_id_and_artist_id", unique: true
    t.index ["song_id"], name: "index_collabs_on_song_id"
  end

  create_table "playlisteds", force: :cascade do |t|
    t.integer "song_id", null: false
    t.integer "playlist_id", null: false
    t.string "timestamps"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["playlist_id"], name: "index_playlisteds_on_playlist_id"
    t.index ["song_id"], name: "index_playlisteds_on_song_id"
  end

  create_table "playlists", force: :cascade do |t|
    t.string "title", null: false
    t.text "description", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["title"], name: "index_playlists_on_title"
    t.index ["updated_at"], name: "index_playlists_on_updated_at"
    t.index ["user_id"], name: "index_playlists_on_user_id"
  end

  create_table "songs", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "album_id", null: false
    t.integer "tracknum", null: false
    t.integer "duration", null: false
    t.string "audio_url", null: false
    t.string "album_image_url", null: false
    t.index ["album_id"], name: "index_songs_on_album_id"
    t.index ["title"], name: "index_songs_on_title"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.date "birthday", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "albums", "artists"
  add_foreign_key "songs", "albums"
end
