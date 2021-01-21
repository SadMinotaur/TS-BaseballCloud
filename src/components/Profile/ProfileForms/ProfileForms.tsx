import React, { useCallback, useEffect, useState } from "react";
import { Form } from "react-final-form";
import { FormsDropdown } from "./../FormsDropdown";
import {
  FormsDiv,
  Row,
  ButtonProfile,
  WarningText,
  CancelPhoto,
  UploadPhoto,
  DropdownSpacing,
} from "./styles";
import { FormsAbout } from "./../FormsAbout";
import { Graphql } from "../graphql/query";
import { TextF } from "./../FormsInput";
import { SectText } from "./../SectionText";
import { GraphqlProfile } from "../../../utils/types/profile";
import { Facilities, School, Team } from "../../../utils/types/req-types";
import CommonStyle from "../../../utils/common-styles/styles";
import PictureProf from "./../../../assets/profileIcon.png";
import API from "../../../utils/api";

export const ProfileForms: React.FC<{
  info?: GraphqlProfile;
  onEditEnd: () => void;
}> = ({ info, onEditEnd }) => {
  const [defaultPicture, setDefaultPicture] = useState<string>(PictureProf);
  const [pictureUrl, setPictureUrl] = useState<string>();
  const [pictureInfo, setPictureInfo] = useState<File>();

  function onSubmitForm(v: any): void {
    API.graphqlPost(Graphql.updateProfile, {
      form: {
        id: info?.id,
        ...v,
        avatar: pictureUrl ? pictureUrl : info?.avatar,
        age: parseInt(v.age),
        feet: parseInt(v.feet),
        inches: parseInt(v.inches),
        weight: parseInt(v.weight),
        school: v.school?.value,
        facilities: [v.facilities?.value],
        teams: [v.teams?.value],
      },
    })
      .then(() => {
        onEditEnd();
      })
      .catch(() => {});
  }

  const getSchools = useCallback(
    () =>
      API.graphqlPost(Graphql.getSchools, {
        search: "",
      }).then((v) =>
        v.schools.schools.map((resp: School) => ({
          value: resp,
          label: resp.name,
        }))
      ),
    []
  );

  const getTeams = useCallback(
    () =>
      API.graphqlPost(Graphql.getTeams, {
        search: "",
      }).then((v) =>
        v.teams.teams.map((resp: Team) => ({
          value: resp,
          label: resp.name,
        }))
      ),
    []
  );

  const getFacilities = useCallback(
    () =>
      API.graphqlPost(Graphql.getFacilities, {
        search: "",
      }).then((v) =>
        v.facilities.facilities.map((resp: Facilities) => ({
          value: resp,
          label: resp.u_name,
        }))
      ),
    []
  );

  useEffect(() => {
    info &&
      API.getPicture(info.avatar).then((v) =>
        setDefaultPicture(`data:image/jpeg;base64,${v}`)
      );
  }, [info]);

  return (
    <FormsDiv>
      <Form
        onSubmit={onSubmitForm}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <CommonStyle.ProfileContainer>
              <CommonStyle.ProfilePic
                src={
                  pictureInfo
                    ? URL.createObjectURL(pictureInfo)
                    : defaultPicture
                }
              />
              <div>
                <input
                  style={{ display: "none" }}
                  id="my-file"
                  type="file"
                  onChange={(e) =>
                    e.target.files && setPictureInfo(e.target.files[0])
                  }
                />
              </div>
              <label htmlFor="my-file">
                {pictureInfo ? pictureInfo.name : "Choose photo"}
              </label>
              {pictureInfo && (
                <>
                  <UploadPhoto
                    onClick={() =>
                      API.uploadAws(pictureInfo).then((v) => setPictureUrl(v))
                    }
                  >
                    Upload photo
                  </UploadPhoto>
                  <CancelPhoto onClick={() => setPictureInfo(undefined)}>
                    Cancel
                  </CancelPhoto>
                </>
              )}
            </CommonStyle.ProfileContainer>
            <Row>
              <TextF
                name="first_name"
                label="First Name*"
                defaultValue={info?.first_name}
                validate={(v: string) =>
                  v ? undefined : "First Name Required"
                }
              />
              <TextF
                name="last_name"
                label="Last Name*"
                space={true}
                defaultValue={info?.last_name}
                validate={(v: string) => (v ? undefined : "Last Name Required")}
              />
            </Row>
            <FormsDropdown
              placeholder="Position in Game*"
              name="position"
              validate={(v: string) => (v ? undefined : "Position Required")}
              defaultValue={info?.position}
              options={[
                { label: "Catcher", value: "catcher" },
                { label: "First Base", value: "first_base" },
                { label: "Second Base", value: "second_base" },
                { label: "Shortstop", value: "shortstop" },
                { label: "Third Base", value: "third_base" },
                { label: "Outfield", value: "outfield" },
                { label: "Pitcher", value: "pitcher" },
              ]}
            />
            <FormsDropdown
              placeholder="Secondary Position in Game"
              name="position2"
              validate={(v: string) => undefined}
              defaultValue={info?.position2}
              options={[
                { label: "-", value: "" },
                { label: "Catcher", value: "catcher" },
                { label: "First Base", value: "first_base" },
                { label: "Second Base", value: "second_base" },
                { label: "Shortstop", value: "shortstop" },
                { label: "Third Base", value: "third_base" },
                { label: "Outfield", value: "outfield" },
                { label: "Pitcher", value: "pitcher" },
              ]}
            />
            <SectText text="Personal Info" />
            <TextF
              name="age"
              label="Age*"
              defaultValue={info?.age.toString()}
              validate={(v: string) => (v ? undefined : "Age Required")}
            />
            <Row>
              <TextF
                name="feet"
                label="Feet*"
                defaultValue={info?.feet.toString()}
                validate={(v: string) =>
                  v
                    ? parseInt(v) > 3
                      ? undefined
                      : "Minimum height is 4"
                    : "Feet Required"
                }
              />
              <TextF
                name="inches"
                label="Inches"
                space={true}
                defaultValue={info?.inches.toString()}
                validate={(v: string) => undefined}
              />
            </Row>
            <TextF
              name="weight"
              label="Weight*"
              defaultValue={info?.weight.toString()}
              validate={(v: string) =>
                v
                  ? parseInt(v) > 39
                    ? undefined
                    : "Minimal weight is 50 lbs"
                  : "Weight Required"
              }
            />
            <Row>
              <DropdownSpacing>
                <FormsDropdown
                  placeholder="Throw*"
                  name="throws_hand"
                  validate={(v) => (v ? undefined : "Throws Required")}
                  defaultValue={info?.throws_hand}
                  options={[
                    { value: "R", label: "R" },
                    { value: "L", label: "L" },
                  ]}
                />
              </DropdownSpacing>
              <DropdownSpacing leftMargin={true}>
                <FormsDropdown
                  placeholder="Bats*"
                  name="bats_hand"
                  validate={(v) => (v ? undefined : "Bats Required")}
                  defaultValue={info?.bats_hand}
                  options={[
                    { value: "R", label: "R" },
                    { value: "L", label: "L" },
                  ]}
                />
              </DropdownSpacing>
            </Row>
            <SectText text="School" />
            <FormsDropdown
              placeholder="School"
              name="school"
              loadOptions={getSchools()}
              validate={(v) => undefined}
              defaultValue={info?.school}
            />
            <FormsDropdown
              placeholder="School Year"
              name="school_year"
              validate={(v) => undefined}
              defaultValue={info?.school_year}
              options={[
                { value: "Freshman", label: "Freshman" },
                { value: "Sophomore", label: "Sophomore" },
                { value: "Junior", label: "Junior" },
                { value: "Senior", label: "Senior" },
                { value: "None", label: "None" },
              ]}
            />
            <FormsDropdown
              placeholder="Team"
              name="teams"
              loadOptions={getTeams()}
              validate={(v) => undefined}
              defaultValue={info?.teams[0]}
            />
            <SectText text="Facility" />
            <FormsDropdown
              multiple={true}
              placeholder="Facility"
              name="facilities"
              loadOptions={getFacilities()}
              validate={(v) => undefined}
              defaultValue={info?.facilities[0]}
            />
            <SectText text="About" />
            <FormsAbout
              biography={info?.biography}
              placeholder="Describe yourself in a few words"
            />
            {info && <WarningText>* Fill out the required fields</WarningText>}
            <Row>
              <ButtonProfile
                onClick={() => {
                  info && onEditEnd();
                }}
                type="reset"
              >
                Cancel
              </ButtonProfile>
              <ButtonProfile borderBlue={true} type="submit">
                Save
              </ButtonProfile>
            </Row>
          </form>
        )}
      />
    </FormsDiv>
  );
};
