Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  root "mixes#index"
  resources :mixes, only: [:show, :new, :create, :edit, :update], param: :slug do
    resources :videos, only: [:create, :destroy]
  end
end
