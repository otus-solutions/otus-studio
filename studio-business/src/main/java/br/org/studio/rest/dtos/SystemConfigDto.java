package br.org.studio.rest.dtos;

public class SystemConfigDto {
	private UserDto user;
	private EmailSenderDto emailSender;

	public UserDto getUserDto() {
		return user;
	}

	public EmailSenderDto getEmailSenderDto() {
		return emailSender;
	}
}
