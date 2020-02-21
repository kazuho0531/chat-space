json.array! @users do |user|
  json.id  user.id
  json.name  user.name
  # json.email  user.email
  # json.encrypted_password  user.encrypted_password
  # json.created_at  user.created_at
  # json.update_at  user.update_at
end