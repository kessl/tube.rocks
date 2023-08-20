Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "mixes#index"
  resources :mixes, only: [:create]
  get '/new', to: 'mixes#new', as: :new_mix
  get '/:slug', to: 'mixes#show', as: :mix
end
