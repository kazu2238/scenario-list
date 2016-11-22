Rails.application.routes.draw do
  root "scenario#top"
    
  get 'search'     => 'scenario#search'
  get 'faker'      => 'scenario#faker'
  get 'screate'    => 'screate#top'
  post 'screate'    => 'screate#top'
  get 'fake'       => 'scenario#fake'
  get 'fake_page/:url'  => 'scenario#fake_page' ,constraints: { url: /[^\/]+/ }
end
