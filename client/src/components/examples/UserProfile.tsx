import UserProfile from '../UserProfile'

export default function UserProfileExample() {
  return (
    <div className="p-6 bg-background">
      <UserProfile 
        onSaveProfile={async (data) => {
          console.log('Profile saved:', data);
        }}
        onUploadAvatar={(file) => {
          console.log('Avatar uploaded:', file.name);
        }}
      />
    </div>
  )
}