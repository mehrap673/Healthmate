import AuthForms from '../AuthForms'

export default function AuthFormsExample() {
  return (
    <AuthForms 
      onLogin={async (data) => {
        console.log('Login:', data);
        alert('Login successful!');
      }}
      onSignup={async (data) => {
        console.log('Signup:', data);
        alert('Signup successful!');
      }}
      onGoogleAuth={() => {
        console.log('Google auth clicked');
        alert('Google auth clicked!');
      }}
    />
  )
}