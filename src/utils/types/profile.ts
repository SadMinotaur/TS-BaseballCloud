export type GraphqlProfile = {
  act_score: number;
  age: number;
  avatar: string;
  bats_hand: string;
  batter_summary: {
    exit_velocity: number;
    distance: number;
    launch_angle: number;
  }[];
  batting_top_values: {
    pitch_type: string;
    distance: number;
    launch_angle: number;
  }[];
  biography: string;
  broad_jump: string;
  events_opened: boolean;
  facilities: {
    id: string;
    email: string;
    u_name: string;
  }[];
  favorite: boolean;
  feet: number;
  first_name: string;
  gpa_score: number;
  grip_left: null;
  grip_right: null;
  id: string;
  inches: number;
  last_name: string;
  paid: boolean;
  pitcher_summary: [];
  pitching_top_values: [];
  position: "first_base";
  position2: "batter";
  recent_events: [];
  sat_score: number;
  school: { id: string; name: string };
  school_year: "Freshman";
  teams: { id: string; name: string }[];
  throws_hand: string;
  weight: number;
  winsgspan: string;
  wrist_to_elbow: string;
};

export type UpdateProfile = {
  id: string;
  first_name: string;
  last_name: string;
  age: string;
  biography: string;
  feet: string;
  inches: string;
  position: Options;
  position2: Options;
  school_year: Options;
  throws_hand: Options;
  bats_hand: Options;
  weight: string;
  school: Options;
  teams: Options[];
  facilities: Options[];
};

export type Event = {
  date: string;
  event_name: string;
  event_type: string;
  id: string;
};

export type ProfileEvents = {
  profile_events: {
    events: Event[];
  };
};

export type TopBatting = {
  id: string | null;
  distance: number;
  pitch_type: string;
  launch_angle: number;
  exit_velocity: number;
};

export type Summary = {
  top_values: TopBatting[];
  average_values: {
    id: string | null;
    distance: number;
    pitch_type: string;
    launch_angle: number;
    exit_velocity: number;
  }[];
};

export type TopBattingBlock = {
  distance: number;
  launch_angle: number;
  exit_velocity: number;
};

export interface BattingSummary {
  batting_summary: Summary;
}

export interface ProfileNames {
  id: string;
  position: string;
  first_name: string;
  last_name: string;
  inches: number;
  feet: number;
  weight: number;
  age: number;
}

export type Options = { label: string; value: any };
