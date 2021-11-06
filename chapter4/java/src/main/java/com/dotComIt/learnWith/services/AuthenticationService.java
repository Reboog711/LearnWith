package com.dotComIt.learnWith.services;
import com.dotComIt.learnWith.vos.UserVO;
import java.sql.*;

public class AuthenticationService {
    Connection connection = null;

    public AuthenticationService(Connection connection) {
        this.connection = connection;
    }

    public UserVO authenticate(String username, String password){
        String SQL;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try{
            SQL = "SELECT * FROM users where username = ? and password = ?";
            pstmt = connection.prepareStatement(SQL);
            pstmt.setString(1, username);
            pstmt.setString(2, password);
            rs = pstmt.executeQuery();
            if(!rs.isBeforeFirst()){
                return null;
            }  else {
                rs.next();
                UserVO user = new UserVO();
                user.setRoleID(rs.getInt("roleID"));
                user.setUserID(rs.getInt("userID"));
                user.setUsername(rs.getString("userName"));
                return user;
            }
        }
        catch(Exception e){
            e.printStackTrace();
        }
        finally {
            if (rs != null) try { rs.close(); } catch(Exception e) {}
            if (pstmt != null) try { pstmt.close(); } catch(Exception e) {}
            if (connection != null) try { connection.close(); } catch(Exception e) {}
        }
        return null;
    }


}
