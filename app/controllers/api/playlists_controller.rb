class Api::PlaylistsController < ApplicationController
    # before_action :require_login

    def index
        # debugger
        # If we had passed user.id through the url, we'd get it from params
        @playlists = Playlist.where(user_id: current_user.id)
        .order(:updated_at).reverse_order 
        render :index 
    end

    def create
        @playlist = Playlist.new(playlist_params)
        if @playlist.save!
            render :show
        else
            render json: @playlist.errors.full_messages, status: 401
        end
    end

    def update
        @playlist = Playlist.find(params[:id])
        if @playlist && @playlist.user_id == current_user.id
            if @playlist.update(playlist_params)
                render :show
            end
        else
            render json: @playlist.errors.full_messages, status: 401
        end
    end

    # start with create
    # edit button will make an edit request to the backend
    # when we fetch songs from the database, order songs by track number
        # fetching an album


    private

    def selected_playlist
        Playlist.find(params[:id])
    end

    def playlist_params
        params.require(:playlist).permit(:title, :description, :user_id)
    end
    
end
