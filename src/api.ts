import Axios, { AxiosResponse } from "axios";
import { SignInResp } from "./apiTypes";

class Api {
  public id: number = localStorage.getItem("id")
    ? Number.parseInt(localStorage.getItem("id") as string)
    : -1;
  private token: string = localStorage.getItem("token") as string;
  private client: string = localStorage.getItem("client") as string;
  private uid: string = localStorage.getItem("uid") as string;

  private setHeaders(v: AxiosResponse<any>) {
    this.token = v.headers["access-token"];
    this.client = v.headers["client"];
    this.uid = v.headers["uid"];
    localStorage.setItem("token", this.token);
    localStorage.setItem("client", this.client);
    localStorage.setItem("uid", this.uid);
  }

  public async signIn(email: string, password: string): Promise<SignInResp> {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/auth/sign_in",
      { email: email, password: password }
    )
      .then((v) => {
        this.setHeaders(v);
        return v.data.data;
      })
      .then((v: SignInResp) => {
        localStorage.setItem("id", v.id.toString());
        this.id = v.id;
        return v;
      });
  }

  public async signUp(
    email: string,
    password: string,
    password_confirmation: string,
    role: string
  ): Promise<SignInResp> {
    return Axios.post("https://baseballcloud-back.herokuapp.com/api/v1/auth/", {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      role: role,
    })
      .then((v) => {
        this.setHeaders(v);
        return v.data.data;
      })
      .then((v: SignInResp) => {
        localStorage.setItem("id", v.id.toString());
        this.id = v.id;
        return v;
      });
  }

  public async getUserInfo() {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/graphql",
      {
        query:
          "{ current_profile ()\n {\n id\n first_name\n last_name\n position\n position2\n avatar\n throws_hand\n bats_hand\n biography\n school_year\n feet\n inches\n weight\n age\n school {\n id\n name\n }\n teams {\n id\n name\n }\n facilities {\n id\n email\n u_name\n }\n }\n }",
      },
      {
        headers: {
          "access-token": this.token,
          client: this.client,
          uid: this.uid,
        },
      }
    );
  }

  public async get() {
    return Axios.post(
      "https://baseballcloud-back.herokuapp.com/api/v1/graphql",
      {
        query:
          "query Profile($id:String!)\n { profile(id: $id)\n {\n id\n first_name\n last_name\n position\n position2\n school_year\n avatar\n throws_hand\n bats_hand\n biography\n feet\n inches\n weight\n age\n …e\n }\n school {\n id\n name\n }\n teams {\n id\n name\n }\n facilities {\n id\n email\n u_name\n }\n favorite\n events_opened\n paid\n }\n }",
        variables: { id: this.id.toString() },
      },
      {
        headers: {
          "access-token": this.token,
          client: this.client,
          uid: this.uid,
        },
      }
    );
  }
}

const API = new Api();
export default API;
