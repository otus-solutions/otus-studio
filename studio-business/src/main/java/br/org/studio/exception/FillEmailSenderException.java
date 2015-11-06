package br.org.studio.exception;

public class FillEmailSenderException extends Exception {

	private static final long serialVersionUID = 2261478834850452911L;
	
	public FillEmailSenderException() {
	}

	public FillEmailSenderException(String message) {
		super(message);
	}

	public FillEmailSenderException(Throwable cause) {
		super(cause);
	}

	public FillEmailSenderException(String message, Throwable cause) {
		super(message, cause);
	}

}
