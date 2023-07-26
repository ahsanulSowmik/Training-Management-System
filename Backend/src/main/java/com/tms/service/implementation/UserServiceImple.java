package com.tms.service.implementation;

import com.tms.entity.*;
import com.tms.exceptions.ResourceNotFoundException;
import com.tms.exceptions.RoleExistsException;
import com.tms.exceptions.UserAlreadyExistException;
import com.tms.functional.UserDetails;
import com.tms.model.UserDto;
import com.tms.repository.*;
import com.tms.response.AllUserResponse;
import com.tms.response.RoleResponse;
import com.tms.response.UserResponse;
import com.tms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserServiceImple implements UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private TraineeRepo traineeRepo;

    @Autowired
    private TrainerRepo trainerRepo;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private AssignmentAnswerRepo assignmentAnswerRepo;


    private final UserDetails userData = (email) -> {
        Optional<User> user = userRepo.findById(email);
        if (user.isPresent()) return user.get();
        return null;
    };

    @Override
    public UserResponse createUser(UserDto userDto) throws UserAlreadyExistException {

        if (userData.getUser(userDto.getEmail()) != null) {
             throw new UserAlreadyExistException("User already exist: " + userDto.getEmail());
        }

            User user = dtoToUser(userDto);
            user.setEmail(user.getEmail());
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepo.save(user);
            user.setPassword(null);
            return new UserResponse("User created successfully: " + user.getEmail(), userToDto(savedUser));
        }

        @Override
        public RoleResponse assignUserRole (String email, String roleName) throws Exception {

            User user = this.userRepo.findById(email)
                    .orElseThrow(() -> new ResourceNotFoundException("User", "Email", email));

            if (roleName.equals("TRAINER")) {
                assignTrainerRole(user);
            } else if (roleName.equals("ADMIN")) {
                assignAdminRole(user);
            } else if (roleName.equals("TRAINEE")) {
                assignTraineeRole(user);
            }
            Role setRole = roleRepo.getRoleByRoleName(roleName);
            System.out.println(setRole);
            Set<Role> role = user.getRole();
            role.add(setRole);
            System.out.printf(setRole.getRoleName());
            user.setRole(role);
            userRepo.save(user);

            return new RoleResponse("Role assigned successfully.", email, setRole);
        }

        private void assignTrainerRole (User user) throws Exception {

            boolean isRoleExists = user.getRole()
                    .stream()
                    .filter(role -> role.getRoleName().equals("TRAINEE"))
                    .findFirst()
                    .isPresent();

            if (isRoleExists) {
                throw new RoleExistsException("Please remove previous Role first.");
            }


            Trainer trainer = new Trainer(user.getEmail());
            trainerRepo.save(trainer);
            user.setTrainer(trainer);
        }

        private void assignAdminRole (User user) throws Exception {

            boolean isRoleExists = user.getRole()
                    .stream()
                    .filter(role -> role.getRoleName().equals("TRAINEE"))
                    .findFirst()
                    .isPresent();

            if (isRoleExists) {
                throw new RoleExistsException("Please remove previous Role first.");
            }

            Admin admin = new Admin(user.getEmail());
            adminRepo.save(admin);
            user.setAdmin(admin);
        }

        private void assignTraineeRole (User user) throws Exception {

            boolean isRoleExists = user.getRole()
                    .stream()
                    .filter(role -> role.getRoleName().equals("TRAINEE"))
                    .findFirst()
                    .isPresent();

            if (isRoleExists) {
                throw new RoleExistsException("Please remove previous Role first.");
            }

            Optional<Trainee> trainee = traineeRepo.findById(user.getEmail());
            if (trainee.isEmpty()) {
                Trainee trainee1 = new Trainee(user.getEmail());
                traineeRepo.save(trainee1);
                user.setTrainee(trainee1);
            } else {
                user.setTrainee(trainee.get());
            }
        }

        @Override
        public AllUserResponse getAllUser () {
            List<User> users = userRepo.findAll();
            return new AllUserResponse("All Users", users);
        }

        @Override
        public UserResponse getUserByEmail (String email){
            User user = userData.getUser(email);
            if (user == null) throw new UsernameNotFoundException("User not found: " + email);
            user.setPassword(null);
            return new UserResponse("User", userToDto(user));
        }

        @Override
        public UserResponse editUserProfile (UserDto userDto){
            User user = dtoToUser(userDto);
            User userDB = userData.getUser(user.getEmail());
            if (userDB == null) throw new UsernameNotFoundException("User not found: " + user.getEmail());
            user.setPassword(userDB.getPassword());
            userRepo.save(user);
            user.setPassword(null);
            return new UserResponse("User data updated.", userToDto(user));
        }

        @Override
        public UserResponse deleteUserData (String email) throws UsernameNotFoundException {
            User user = userData.getUser(email);
            if (user == null) throw new UsernameNotFoundException("User not found: " + email);
            userRepo.deleteById(email);
            return new UserResponse("User data deleted.", userToDto(new User()));
        }

        @Override
        public List<String> getUserEmailsAssignedAsTrainers () {
            return userRepo.findUserEmailsAssignedAsTrainers();
        }

        @Override
        public List<String> getUserEmailsAssignedAsTrainees () {
            return userRepo.findUserEmailsAssignedAsTrainees();
        }

        @Override
        public List<AssignmentAnswer> getAllAnswerByTraineeEmail (String email){
            User user = userData.getUser(email);
            if (user == null) throw new UsernameNotFoundException("User not found: " + email);
            user.setPassword(null);
            return assignmentAnswerRepo.findByTraineeEmail(email);
        }

        public User dtoToUser (UserDto userDto){
            User user = this.modelMapper.map(userDto, User.class);
            return user;
        }

        public UserDto userToDto (User user){
            UserDto userDto = this.modelMapper.map(user, UserDto.class);
            return userDto;
        }


    }
