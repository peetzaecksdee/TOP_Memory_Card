function Modal({ className, children }) {
	return (
		<div className={`modal ${className}`}>
			<div className='modal-content'>
				{children}
			</div>
		</div>
	);
}

export default Modal;
