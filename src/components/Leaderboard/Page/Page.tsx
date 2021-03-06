import React, { useCallback, useEffect, useState } from "react";
import { Graphql } from "./../graphql/query";
import { InputBlue } from "../../../common-components/input-blue";
import { DropdownBlue } from "../../../common-components/dropdown-blue";
import {
  BattingUser,
  PitchingUser,
  GetBatting,
  GetPitching,
} from "../../../utils/types/leaderboard";
import { Field, Form, FormSpy } from "react-final-form";
import { FormState } from "final-form";
import { LeaderboardContent } from "./../LeaderboardContent";
import { MakeFavorite } from "./../../../utils/make-favotite";
import CommonStyle from "../../../common-styles/styles";
import API from "../../../utils/api";
import Stl from "./styles";

export const LeaderboardPage: React.FC<{
  ShowErrorToast: (text: string) => void;
  ShowSuccessToast: (text: string) => void;
}> = ({ ShowSuccessToast, ShowErrorToast }) => {
  const [loadingContent, setLoadingContent] = useState<boolean>(false);
  const [currentSwitch, setCurrentSwitch] = useState<boolean>(true);

  const [contentBatting, setBattingContent] = useState<BattingUser[]>([]);
  const [contentPitching, setPitchingContent] = useState<PitchingUser[]>([]);

  const getB = useCallback(
    (req: Record<string, any> = { type: "exit_velocity" }) => {
      setLoadingContent(true);
      API.graphqlPost(Graphql.getBatting, {
        input: req,
      }).then((v: GetBatting) => {
        setBattingContent(v.leaderboard_batting.leaderboard_batting);
        setLoadingContent(false);
      });
    },
    []
  );

  function getP(req: Record<string, any> = { type: "pitch_velocity" }): void {
    setLoadingContent(true);
    API.graphqlPost(Graphql.getPitching, {
      input: req,
    }).then((v: GetPitching) => {
      setPitchingContent(v.leaderboard_pitching.leaderboard_pitching);
      setLoadingContent(false);
    });
  }

  function onClickFavB(v: BattingUser): void {
    MakeFavorite(!v.favorite, v.batter_datraks_id, ShowSuccessToast)
      .then(() =>
        setBattingContent((ps: BattingUser[]) =>
          ps.map((item: BattingUser) =>
            item.batter_datraks_id !== v.batter_datraks_id
              ? item
              : { ...v, favorite: !v.favorite }
          )
        )
      )
      .catch(() => ShowErrorToast("Error updating profile"));
  }

  function onClickFavP(v: PitchingUser): void {
    MakeFavorite(!v.favorite, v.pitcher_datraks_id, ShowSuccessToast)
      .then(() =>
        setPitchingContent((ps: PitchingUser[]) =>
          ps.map((item: PitchingUser) =>
            item.pitcher_datraks_id !== v.pitcher_datraks_id
              ? item
              : { ...v, favorite: !v.favorite }
          )
        )
      )
      .catch(() => ShowErrorToast("Error updating profile"));
  }

  function updateContent(fields: FormState<Record<string, any>>): void {
    const v = fields.values;
    const req = {
      ...v,
      age: v.age && parseInt(v.age),
      favorite: v.favorite && parseInt(v.favorite),
    };
    currentSwitch ? getB(req) : getP(req);
  }

  useEffect(() => {
    getB();
  }, [getB]);

  return (
    <Stl.Container>
      <Form
        onSubmit={() => {}}
        render={() => (
          <>
            <Stl.Header>
              <h3>Leaderboard</h3>
              <Stl.InputGroup>
                <Field name="date">
                  {({ input }) => (
                    <Stl.DropdownText>
                      Date
                      <DropdownBlue
                        input={input}
                        width={100}
                        options={[
                          { label: "All", value: "" },
                          { label: "Last Week", value: "last_week" },
                          { label: "Last Month", value: "last_month" },
                        ]}
                      />
                    </Stl.DropdownText>
                  )}
                </Field>
                <Field name="school" type="input">
                  {({ input }) => (
                    <InputBlue
                      input={input}
                      name="School"
                      width={55}
                      widthFocus={180}
                    />
                  )}
                </Field>
                <Field name="team" type="input">
                  {({ input }) => (
                    <InputBlue
                      input={input}
                      name="Team"
                      width={45}
                      widthFocus={180}
                    />
                  )}
                </Field>
                <Field name="position">
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={100}
                      options={[
                        { label: "All", value: "" },
                        { label: "Catcher", value: "catcher" },
                        { label: "First Base", value: "first_base" },
                        { label: "Second Base", value: "second_base" },
                        { label: "Sportstop", value: "shortstop" },
                        { label: "Third Base", value: "third_base" },
                        { label: "Outfield", value: "outfield" },
                        { label: "Pitcher", value: "pitcher" },
                      ]}
                    />
                  )}
                </Field>
                <Field name="age" type="number">
                  {({ input }) => (
                    <InputBlue
                      input={input}
                      name="Age"
                      width={35}
                      widthFocus={80}
                    />
                  )}
                </Field>
                <Field name="favorite">
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={80}
                      options={[
                        { label: "All", value: "" },
                        { label: "Favorite", value: "1" },
                      ]}
                    />
                  )}
                </Field>
              </Stl.InputGroup>
            </Stl.Header>
            <Stl.HeaderTabs>
              <Stl.TabsContainer>
                <CommonStyle.HeaderTab
                  onClick={() => {
                    getB();
                    setCurrentSwitch(true);
                  }}
                  active={currentSwitch}
                >
                  Batting
                </CommonStyle.HeaderTab>
                <CommonStyle.HeaderTab
                  onClick={() => {
                    getP();
                    setCurrentSwitch(false);
                  }}
                  active={!currentSwitch}
                >
                  Pitching
                </CommonStyle.HeaderTab>
              </Stl.TabsContainer>
              {currentSwitch ? (
                <Field name="type" defaultValue={"exit_velocity"}>
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={120}
                      options={[
                        {
                          label: "Exit Velocity",
                          value: "exit_velocity",
                        },
                        {
                          label: "Carry Distance",
                          value: "carry_distance",
                        },
                      ]}
                    />
                  )}
                </Field>
              ) : (
                <Field name="type" defaultValue={"pitch_velocity"}>
                  {({ input }) => (
                    <DropdownBlue
                      input={input}
                      width={120}
                      options={[
                        {
                          label: "Pitch Velocity",
                          value: "pitch_velocity",
                        },
                        {
                          label: "Spin Rate",
                          value: "spin_rate",
                        },
                      ]}
                    />
                  )}
                </Field>
              )}
            </Stl.HeaderTabs>
            <FormSpy subscription={{ values: true }} onChange={updateContent} />
          </>
        )}
      />
      <LeaderboardContent
        onClickFavP={onClickFavP}
        onClickFavB={onClickFavB}
        currentSwitch={currentSwitch}
        loadingContent={loadingContent}
        contentBatting={contentBatting}
        contentPitching={contentPitching}
      />
    </Stl.Container>
  );
};
