export default function ApplicationLogo(props) {
    return (
        <img
            {...props}
            src="/logo.png"
            alt="Application Logo"
            className="h-16 w-auto" 
        />
    );
}