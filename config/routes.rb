Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root "mixes#index"
  resources :mixes, only: [:show, :new, :create, :edit, :update], param: :slug do
    collection do
      get '/random', action: :random, as: :random
    end
    member do
      post '/play', action: :play
    end
  end
  resources :videos, only: [:new]
end
