import Navigation from '../Navigation'

export default function NavigationExample() {
  return (
    <Navigation 
      currentUser={{
        name: "John Doe",
        email: "john@example.com",
        avatar: ""
      }}
      onNavigate={(href) => console.log(`Navigate to: ${href}`)}
      onLogout={() => console.log('User logged out')}
      isDarkMode={false}
      onToggleTheme={() => console.log('Theme toggled')}
    />
  )
}