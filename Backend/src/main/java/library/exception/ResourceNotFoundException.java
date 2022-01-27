package library.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException(String message) {
		super(message);
	}
}


//Go to Window>Preferences>Java>Installed JREs
//Click the Add button, Select Standard VM, click Next.
//On new window that pops up, click Directory button to browse for the folder 
//where JDK(like JDK1.6.0_18)was extracted. Follow the prompts, and all will be back to normal.