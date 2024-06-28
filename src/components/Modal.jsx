function Modal({score = 0, className}) {
  return (
    <div className={`modal ${className}`}>
      <div className="modal-content">
        <h1>! Game Over !</h1>
        <span>You scored {score}</span>
        <span>Resetting...</span>
      </div>
    </div>
  );
}

export default Modal;