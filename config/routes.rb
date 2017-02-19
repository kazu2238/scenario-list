Rails.application.routes.draw do
  root "scenario#top"
    
  get 'search'     => 'scenario#search'
  get 'faker'      => 'scenario#faker'
  get 'screate'    => 'screate#top'
  post 'screate'    => 'screate#top'
  post 'screate_preview' => 'screate#preview'
  get 'texshare'    => 'texshare#top'
  get 'fake'       => 'scenario#fake'
  get 'fake_page/:url'  => 'scenario#fake_page' ,constraints: { url: /[^\/]+/ }
  post 'texshare/upload' => 'texshare#upload'
  get 'page/:url'       => 'texshare#page' ,constraints: { url: /[^\/]+/ }

end
