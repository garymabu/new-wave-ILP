export class UserService {
  public getUserPicUrl(userEmail: string): string {
    return `/_layouts/15/userphoto.aspx?size=L&accountname=${userEmail}`;
  }
}
