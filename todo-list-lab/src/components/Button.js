function Button({ text, onClick, type = "button"})  {
    //Text - will be text displayed on button
    //onClick - function to call when click(optional)
    //type - button type (default: button or submit; for submit think form)

    return(
        <button type={type} onClick={onClick}>
            {text}
        </button>
    );
}

export default Button;