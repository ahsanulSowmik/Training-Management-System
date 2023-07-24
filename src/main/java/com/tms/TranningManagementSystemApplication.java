package com.tms;

import com.tms.entity.Role;
import com.tms.entity.User;
import com.tms.model.UserDto;
import com.tms.repository.RoleRepo;
import com.tms.response.UserResponse;
import com.tms.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class TranningManagementSystemApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(TranningManagementSystemApplication.class, args);
	}


	@Autowired
	UserService userService;

	@Autowired
	RoleRepo roleRepo;
	@Bean
	public ModelMapper modelMapper() {
		return new ModelMapper();
	}


	@Override
	public void run(String... args) throws Exception {
		try {
			Role role = new Role();
			role.setRoleName("ADMIN");
			role.setRoleDescription("role_admin");

			Role role1 = new Role();
			role1.setRoleName("TRAINEE");
			role1.setRoleDescription("trainee");

			Role role2 = new Role();
			role2.setRoleName("TRAINER");
			role2.setRoleDescription("trainer");

			List<Role> roles = List.of(role, role1, role2);

			List<Role> result = this.roleRepo.saveAll(roles);

			result.forEach(r -> {
				System.out.println(r.getRoleName());
			});

			Role adminRole = Role.builder()
					.roleName("ADMIN")
					.roleDescription("role_admin")
					.build();

			UserDto user = UserDto.builder()
					.email("admin@gmail.com")
					.password("123456")
					.firstName("Admin")
					.lastName("Vai")
					.address("123 Main St")
					.dateOfBirth("1990-01-01")
					.gender("Male")
					.profilePicture("")
					.phone("1234567890")
					.build();

			// Assign the Role to the User
//			user.setRole(adminRole);

			// Save the User to the database
			UserResponse savedUser = userService.createUser(user);
			userService.assignUserRole(user.getEmail(),"ADMIN");

			System.out.println("User saved successfully with ID: " + savedUser.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
