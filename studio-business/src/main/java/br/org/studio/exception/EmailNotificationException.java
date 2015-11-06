package br.org.studio.exception;

public class EmailNotificationException extends Exception {

	private static final long serialVersionUID = 2323962994727909366L;

	public EmailNotificationException() {
	}

	public EmailNotificationException(String message) {
		super(message);
	}

	public EmailNotificationException(Throwable cause) {
		super(cause);
	}

	public EmailNotificationException(String message, Throwable cause) {
		super(message, cause);
	}

}
