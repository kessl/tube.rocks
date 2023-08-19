Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "mixer#index"

  resources :mixes, only: [:new, :index, :create]
  get '/:slug', to: 'mixes#show', as: :mix
end
