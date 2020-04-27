import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  timestamptz: any;
};

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>;
  _gt?: Maybe<Scalars['Int']>;
  _gte?: Maybe<Scalars['Int']>;
  _in?: Maybe<Array<Scalars['Int']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['Int']>;
  _lte?: Maybe<Scalars['Int']>;
  _neq?: Maybe<Scalars['Int']>;
  _nin?: Maybe<Array<Scalars['Int']>>;
};

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>;
  _gt?: Maybe<Scalars['String']>;
  _gte?: Maybe<Scalars['String']>;
  _ilike?: Maybe<Scalars['String']>;
  _in?: Maybe<Array<Scalars['String']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _like?: Maybe<Scalars['String']>;
  _lt?: Maybe<Scalars['String']>;
  _lte?: Maybe<Scalars['String']>;
  _neq?: Maybe<Scalars['String']>;
  _nilike?: Maybe<Scalars['String']>;
  _nin?: Maybe<Array<Scalars['String']>>;
  _nlike?: Maybe<Scalars['String']>;
  _nsimilar?: Maybe<Scalars['String']>;
  _similar?: Maybe<Scalars['String']>;
};

/** mutation root */
export type Mutation_Root = {
   __typename?: 'mutation_root';
  /** delete data from the table: "online_users" */
  delete_online_users?: Maybe<Online_Users_Mutation_Response>;
  /** delete data from the table: "poker_session" */
  delete_poker_session?: Maybe<Poker_Session_Mutation_Response>;
  /** delete data from the table: "poker_user_session" */
  delete_poker_user_session?: Maybe<Poker_User_Session_Mutation_Response>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** insert data into the table: "online_users" */
  insert_online_users?: Maybe<Online_Users_Mutation_Response>;
  /** insert data into the table: "poker_session" */
  insert_poker_session?: Maybe<Poker_Session_Mutation_Response>;
  /** insert data into the table: "poker_user_session" */
  insert_poker_user_session?: Maybe<Poker_User_Session_Mutation_Response>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** update data of the table: "online_users" */
  update_online_users?: Maybe<Online_Users_Mutation_Response>;
  /** update data of the table: "poker_session" */
  update_poker_session?: Maybe<Poker_Session_Mutation_Response>;
  /** update data of the table: "poker_user_session" */
  update_poker_user_session?: Maybe<Poker_User_Session_Mutation_Response>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
};


/** mutation root */
export type Mutation_RootDelete_Online_UsersArgs = {
  where: Online_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Poker_SessionArgs = {
  where: Poker_Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Poker_User_SessionArgs = {
  where: Poker_User_Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootInsert_Online_UsersArgs = {
  objects: Array<Online_Users_Insert_Input>;
};


/** mutation root */
export type Mutation_RootInsert_Poker_SessionArgs = {
  objects: Array<Poker_Session_Insert_Input>;
  on_conflict?: Maybe<Poker_Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Poker_User_SessionArgs = {
  objects: Array<Poker_User_Session_Insert_Input>;
  on_conflict?: Maybe<Poker_User_Session_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_Online_UsersArgs = {
  _set?: Maybe<Online_Users_Set_Input>;
  where: Online_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Poker_SessionArgs = {
  _inc?: Maybe<Poker_Session_Inc_Input>;
  _set?: Maybe<Poker_Session_Set_Input>;
  where: Poker_Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Poker_User_SessionArgs = {
  _inc?: Maybe<Poker_User_Session_Inc_Input>;
  _set?: Maybe<Poker_User_Session_Set_Input>;
  where: Poker_User_Session_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: Maybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};

/** columns and relationships of "online_users" */
export type Online_Users = {
   __typename?: 'online_users';
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  user: Array<Users>;
  /** An aggregated array relationship */
  user_aggregate: Users_Aggregate;
};


/** columns and relationships of "online_users" */
export type Online_UsersUserArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** columns and relationships of "online_users" */
export type Online_UsersUser_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};

/** aggregated selection of "online_users" */
export type Online_Users_Aggregate = {
   __typename?: 'online_users_aggregate';
  aggregate?: Maybe<Online_Users_Aggregate_Fields>;
  nodes: Array<Online_Users>;
};

/** aggregate fields of "online_users" */
export type Online_Users_Aggregate_Fields = {
   __typename?: 'online_users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Online_Users_Max_Fields>;
  min?: Maybe<Online_Users_Min_Fields>;
};


/** aggregate fields of "online_users" */
export type Online_Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Online_Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "online_users" */
export type Online_Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Online_Users_Max_Order_By>;
  min?: Maybe<Online_Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "online_users" */
export type Online_Users_Arr_Rel_Insert_Input = {
  data: Array<Online_Users_Insert_Input>;
};

/** Boolean expression to filter rows from the table "online_users". All fields are combined with a logical 'AND'. */
export type Online_Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Online_Users_Bool_Exp>>>;
  _not?: Maybe<Online_Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Online_Users_Bool_Exp>>>;
  id?: Maybe<String_Comparison_Exp>;
  last_seen?: Maybe<Timestamptz_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
};

/** input type for inserting data into table "online_users" */
export type Online_Users_Insert_Input = {
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  user?: Maybe<Users_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Online_Users_Max_Fields = {
   __typename?: 'online_users_max_fields';
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "online_users" */
export type Online_Users_Max_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Online_Users_Min_Fields = {
   __typename?: 'online_users_min_fields';
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "online_users" */
export type Online_Users_Min_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
};

/** response of any mutation on the table "online_users" */
export type Online_Users_Mutation_Response = {
   __typename?: 'online_users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Online_Users>;
};

/** input type for inserting object relation for remote table "online_users" */
export type Online_Users_Obj_Rel_Insert_Input = {
  data: Online_Users_Insert_Input;
};

/** ordering options when selecting data from "online_users" */
export type Online_Users_Order_By = {
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  user_aggregate?: Maybe<Users_Aggregate_Order_By>;
};

/** select columns of table "online_users" */
export enum Online_Users_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen'
}

/** input type for updating data in table "online_users" */
export type Online_Users_Set_Input = {
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
};

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "poker_session" */
export type Poker_Session = {
   __typename?: 'poker_session';
  id: Scalars['Int'];
  name: Scalars['String'];
  owner_id: Scalars['String'];
  /** An object relationship */
  session_owner: Users;
  /** An array relationship */
  user_sessions: Array<Poker_User_Session>;
  /** An aggregated array relationship */
  user_sessions_aggregate: Poker_User_Session_Aggregate;
};


/** columns and relationships of "poker_session" */
export type Poker_SessionUser_SessionsArgs = {
  distinct_on?: Maybe<Array<Poker_User_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_User_Session_Order_By>>;
  where?: Maybe<Poker_User_Session_Bool_Exp>;
};


/** columns and relationships of "poker_session" */
export type Poker_SessionUser_Sessions_AggregateArgs = {
  distinct_on?: Maybe<Array<Poker_User_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_User_Session_Order_By>>;
  where?: Maybe<Poker_User_Session_Bool_Exp>;
};

/** aggregated selection of "poker_session" */
export type Poker_Session_Aggregate = {
   __typename?: 'poker_session_aggregate';
  aggregate?: Maybe<Poker_Session_Aggregate_Fields>;
  nodes: Array<Poker_Session>;
};

/** aggregate fields of "poker_session" */
export type Poker_Session_Aggregate_Fields = {
   __typename?: 'poker_session_aggregate_fields';
  avg?: Maybe<Poker_Session_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Poker_Session_Max_Fields>;
  min?: Maybe<Poker_Session_Min_Fields>;
  stddev?: Maybe<Poker_Session_Stddev_Fields>;
  stddev_pop?: Maybe<Poker_Session_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Poker_Session_Stddev_Samp_Fields>;
  sum?: Maybe<Poker_Session_Sum_Fields>;
  var_pop?: Maybe<Poker_Session_Var_Pop_Fields>;
  var_samp?: Maybe<Poker_Session_Var_Samp_Fields>;
  variance?: Maybe<Poker_Session_Variance_Fields>;
};


/** aggregate fields of "poker_session" */
export type Poker_Session_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Poker_Session_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "poker_session" */
export type Poker_Session_Aggregate_Order_By = {
  avg?: Maybe<Poker_Session_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Poker_Session_Max_Order_By>;
  min?: Maybe<Poker_Session_Min_Order_By>;
  stddev?: Maybe<Poker_Session_Stddev_Order_By>;
  stddev_pop?: Maybe<Poker_Session_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Poker_Session_Stddev_Samp_Order_By>;
  sum?: Maybe<Poker_Session_Sum_Order_By>;
  var_pop?: Maybe<Poker_Session_Var_Pop_Order_By>;
  var_samp?: Maybe<Poker_Session_Var_Samp_Order_By>;
  variance?: Maybe<Poker_Session_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "poker_session" */
export type Poker_Session_Arr_Rel_Insert_Input = {
  data: Array<Poker_Session_Insert_Input>;
  on_conflict?: Maybe<Poker_Session_On_Conflict>;
};

/** aggregate avg on columns */
export type Poker_Session_Avg_Fields = {
   __typename?: 'poker_session_avg_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "poker_session" */
export type Poker_Session_Avg_Order_By = {
  id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "poker_session". All fields are combined with a logical 'AND'. */
export type Poker_Session_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Poker_Session_Bool_Exp>>>;
  _not?: Maybe<Poker_Session_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Poker_Session_Bool_Exp>>>;
  id?: Maybe<Int_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
  owner_id?: Maybe<String_Comparison_Exp>;
  session_owner?: Maybe<Users_Bool_Exp>;
  user_sessions?: Maybe<Poker_User_Session_Bool_Exp>;
};

/** unique or primary key constraints on table "poker_session" */
export enum Poker_Session_Constraint {
  /** unique or primary key constraint */
  PokerSessionPkey = 'poker_session_pkey'
}

/** input type for incrementing integer columne in table "poker_session" */
export type Poker_Session_Inc_Input = {
  id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "poker_session" */
export type Poker_Session_Insert_Input = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
  session_owner?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_sessions?: Maybe<Poker_User_Session_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Poker_Session_Max_Fields = {
   __typename?: 'poker_session_max_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "poker_session" */
export type Poker_Session_Max_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Poker_Session_Min_Fields = {
   __typename?: 'poker_session_min_fields';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "poker_session" */
export type Poker_Session_Min_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "poker_session" */
export type Poker_Session_Mutation_Response = {
   __typename?: 'poker_session_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Poker_Session>;
};

/** input type for inserting object relation for remote table "poker_session" */
export type Poker_Session_Obj_Rel_Insert_Input = {
  data: Poker_Session_Insert_Input;
  on_conflict?: Maybe<Poker_Session_On_Conflict>;
};

/** on conflict condition type for table "poker_session" */
export type Poker_Session_On_Conflict = {
  constraint: Poker_Session_Constraint;
  update_columns: Array<Poker_Session_Update_Column>;
  where?: Maybe<Poker_Session_Bool_Exp>;
};

/** ordering options when selecting data from "poker_session" */
export type Poker_Session_Order_By = {
  id?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
  owner_id?: Maybe<Order_By>;
  session_owner?: Maybe<Users_Order_By>;
  user_sessions_aggregate?: Maybe<Poker_User_Session_Aggregate_Order_By>;
};

/** select columns of table "poker_session" */
export enum Poker_Session_Select_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id'
}

/** input type for updating data in table "poker_session" */
export type Poker_Session_Set_Input = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  owner_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Poker_Session_Stddev_Fields = {
   __typename?: 'poker_session_stddev_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "poker_session" */
export type Poker_Session_Stddev_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Poker_Session_Stddev_Pop_Fields = {
   __typename?: 'poker_session_stddev_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "poker_session" */
export type Poker_Session_Stddev_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Poker_Session_Stddev_Samp_Fields = {
   __typename?: 'poker_session_stddev_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "poker_session" */
export type Poker_Session_Stddev_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Poker_Session_Sum_Fields = {
   __typename?: 'poker_session_sum_fields';
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "poker_session" */
export type Poker_Session_Sum_Order_By = {
  id?: Maybe<Order_By>;
};

/** update columns of table "poker_session" */
export enum Poker_Session_Update_Column {
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  OwnerId = 'owner_id'
}

/** aggregate var_pop on columns */
export type Poker_Session_Var_Pop_Fields = {
   __typename?: 'poker_session_var_pop_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "poker_session" */
export type Poker_Session_Var_Pop_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Poker_Session_Var_Samp_Fields = {
   __typename?: 'poker_session_var_samp_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "poker_session" */
export type Poker_Session_Var_Samp_Order_By = {
  id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Poker_Session_Variance_Fields = {
   __typename?: 'poker_session_variance_fields';
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "poker_session" */
export type Poker_Session_Variance_Order_By = {
  id?: Maybe<Order_By>;
};

/** columns and relationships of "poker_user_session" */
export type Poker_User_Session = {
   __typename?: 'poker_user_session';
  current_vote?: Maybe<Scalars['String']>;
  /** An object relationship */
  poker_session: Poker_Session;
  session_id: Scalars['Int'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['String'];
};

/** aggregated selection of "poker_user_session" */
export type Poker_User_Session_Aggregate = {
   __typename?: 'poker_user_session_aggregate';
  aggregate?: Maybe<Poker_User_Session_Aggregate_Fields>;
  nodes: Array<Poker_User_Session>;
};

/** aggregate fields of "poker_user_session" */
export type Poker_User_Session_Aggregate_Fields = {
   __typename?: 'poker_user_session_aggregate_fields';
  avg?: Maybe<Poker_User_Session_Avg_Fields>;
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Poker_User_Session_Max_Fields>;
  min?: Maybe<Poker_User_Session_Min_Fields>;
  stddev?: Maybe<Poker_User_Session_Stddev_Fields>;
  stddev_pop?: Maybe<Poker_User_Session_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Poker_User_Session_Stddev_Samp_Fields>;
  sum?: Maybe<Poker_User_Session_Sum_Fields>;
  var_pop?: Maybe<Poker_User_Session_Var_Pop_Fields>;
  var_samp?: Maybe<Poker_User_Session_Var_Samp_Fields>;
  variance?: Maybe<Poker_User_Session_Variance_Fields>;
};


/** aggregate fields of "poker_user_session" */
export type Poker_User_Session_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Poker_User_Session_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "poker_user_session" */
export type Poker_User_Session_Aggregate_Order_By = {
  avg?: Maybe<Poker_User_Session_Avg_Order_By>;
  count?: Maybe<Order_By>;
  max?: Maybe<Poker_User_Session_Max_Order_By>;
  min?: Maybe<Poker_User_Session_Min_Order_By>;
  stddev?: Maybe<Poker_User_Session_Stddev_Order_By>;
  stddev_pop?: Maybe<Poker_User_Session_Stddev_Pop_Order_By>;
  stddev_samp?: Maybe<Poker_User_Session_Stddev_Samp_Order_By>;
  sum?: Maybe<Poker_User_Session_Sum_Order_By>;
  var_pop?: Maybe<Poker_User_Session_Var_Pop_Order_By>;
  var_samp?: Maybe<Poker_User_Session_Var_Samp_Order_By>;
  variance?: Maybe<Poker_User_Session_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "poker_user_session" */
export type Poker_User_Session_Arr_Rel_Insert_Input = {
  data: Array<Poker_User_Session_Insert_Input>;
  on_conflict?: Maybe<Poker_User_Session_On_Conflict>;
};

/** aggregate avg on columns */
export type Poker_User_Session_Avg_Fields = {
   __typename?: 'poker_user_session_avg_fields';
  session_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "poker_user_session" */
export type Poker_User_Session_Avg_Order_By = {
  session_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "poker_user_session". All fields are combined with a logical 'AND'. */
export type Poker_User_Session_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Poker_User_Session_Bool_Exp>>>;
  _not?: Maybe<Poker_User_Session_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Poker_User_Session_Bool_Exp>>>;
  current_vote?: Maybe<String_Comparison_Exp>;
  poker_session?: Maybe<Poker_Session_Bool_Exp>;
  session_id?: Maybe<Int_Comparison_Exp>;
  user?: Maybe<Users_Bool_Exp>;
  user_id?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "poker_user_session" */
export enum Poker_User_Session_Constraint {
  /** unique or primary key constraint */
  PokerUserSessionPkey = 'poker_user_session_pkey'
}

/** input type for incrementing integer columne in table "poker_user_session" */
export type Poker_User_Session_Inc_Input = {
  session_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "poker_user_session" */
export type Poker_User_Session_Insert_Input = {
  current_vote?: Maybe<Scalars['String']>;
  poker_session?: Maybe<Poker_Session_Obj_Rel_Insert_Input>;
  session_id?: Maybe<Scalars['Int']>;
  user?: Maybe<Users_Obj_Rel_Insert_Input>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Poker_User_Session_Max_Fields = {
   __typename?: 'poker_user_session_max_fields';
  current_vote?: Maybe<Scalars['String']>;
  session_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "poker_user_session" */
export type Poker_User_Session_Max_Order_By = {
  current_vote?: Maybe<Order_By>;
  session_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Poker_User_Session_Min_Fields = {
   __typename?: 'poker_user_session_min_fields';
  current_vote?: Maybe<Scalars['String']>;
  session_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "poker_user_session" */
export type Poker_User_Session_Min_Order_By = {
  current_vote?: Maybe<Order_By>;
  session_id?: Maybe<Order_By>;
  user_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "poker_user_session" */
export type Poker_User_Session_Mutation_Response = {
   __typename?: 'poker_user_session_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Poker_User_Session>;
};

/** input type for inserting object relation for remote table "poker_user_session" */
export type Poker_User_Session_Obj_Rel_Insert_Input = {
  data: Poker_User_Session_Insert_Input;
  on_conflict?: Maybe<Poker_User_Session_On_Conflict>;
};

/** on conflict condition type for table "poker_user_session" */
export type Poker_User_Session_On_Conflict = {
  constraint: Poker_User_Session_Constraint;
  update_columns: Array<Poker_User_Session_Update_Column>;
  where?: Maybe<Poker_User_Session_Bool_Exp>;
};

/** ordering options when selecting data from "poker_user_session" */
export type Poker_User_Session_Order_By = {
  current_vote?: Maybe<Order_By>;
  poker_session?: Maybe<Poker_Session_Order_By>;
  session_id?: Maybe<Order_By>;
  user?: Maybe<Users_Order_By>;
  user_id?: Maybe<Order_By>;
};

/** select columns of table "poker_user_session" */
export enum Poker_User_Session_Select_Column {
  /** column name */
  CurrentVote = 'current_vote',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "poker_user_session" */
export type Poker_User_Session_Set_Input = {
  current_vote?: Maybe<Scalars['String']>;
  session_id?: Maybe<Scalars['Int']>;
  user_id?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Poker_User_Session_Stddev_Fields = {
   __typename?: 'poker_user_session_stddev_fields';
  session_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "poker_user_session" */
export type Poker_User_Session_Stddev_Order_By = {
  session_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Poker_User_Session_Stddev_Pop_Fields = {
   __typename?: 'poker_user_session_stddev_pop_fields';
  session_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "poker_user_session" */
export type Poker_User_Session_Stddev_Pop_Order_By = {
  session_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Poker_User_Session_Stddev_Samp_Fields = {
   __typename?: 'poker_user_session_stddev_samp_fields';
  session_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "poker_user_session" */
export type Poker_User_Session_Stddev_Samp_Order_By = {
  session_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Poker_User_Session_Sum_Fields = {
   __typename?: 'poker_user_session_sum_fields';
  session_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "poker_user_session" */
export type Poker_User_Session_Sum_Order_By = {
  session_id?: Maybe<Order_By>;
};

/** update columns of table "poker_user_session" */
export enum Poker_User_Session_Update_Column {
  /** column name */
  CurrentVote = 'current_vote',
  /** column name */
  SessionId = 'session_id',
  /** column name */
  UserId = 'user_id'
}

/** aggregate var_pop on columns */
export type Poker_User_Session_Var_Pop_Fields = {
   __typename?: 'poker_user_session_var_pop_fields';
  session_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "poker_user_session" */
export type Poker_User_Session_Var_Pop_Order_By = {
  session_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Poker_User_Session_Var_Samp_Fields = {
   __typename?: 'poker_user_session_var_samp_fields';
  session_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "poker_user_session" */
export type Poker_User_Session_Var_Samp_Order_By = {
  session_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Poker_User_Session_Variance_Fields = {
   __typename?: 'poker_user_session_variance_fields';
  session_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "poker_user_session" */
export type Poker_User_Session_Variance_Order_By = {
  session_id?: Maybe<Order_By>;
};

/** query root */
export type Query_Root = {
   __typename?: 'query_root';
  /** fetch data from the table: "online_users" */
  online_users: Array<Online_Users>;
  /** fetch aggregated fields from the table: "online_users" */
  online_users_aggregate: Online_Users_Aggregate;
  /** fetch data from the table: "poker_session" */
  poker_session: Array<Poker_Session>;
  /** fetch aggregated fields from the table: "poker_session" */
  poker_session_aggregate: Poker_Session_Aggregate;
  /** fetch data from the table: "poker_session" using primary key columns */
  poker_session_by_pk?: Maybe<Poker_Session>;
  /** fetch data from the table: "poker_user_session" */
  poker_user_session: Array<Poker_User_Session>;
  /** fetch aggregated fields from the table: "poker_user_session" */
  poker_user_session_aggregate: Poker_User_Session_Aggregate;
  /** fetch data from the table: "poker_user_session" using primary key columns */
  poker_user_session_by_pk?: Maybe<Poker_User_Session>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** query root */
export type Query_RootOnline_UsersArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Online_Users_Order_By>>;
  where?: Maybe<Online_Users_Bool_Exp>;
};


/** query root */
export type Query_RootOnline_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Online_Users_Order_By>>;
  where?: Maybe<Online_Users_Bool_Exp>;
};


/** query root */
export type Query_RootPoker_SessionArgs = {
  distinct_on?: Maybe<Array<Poker_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_Session_Order_By>>;
  where?: Maybe<Poker_Session_Bool_Exp>;
};


/** query root */
export type Query_RootPoker_Session_AggregateArgs = {
  distinct_on?: Maybe<Array<Poker_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_Session_Order_By>>;
  where?: Maybe<Poker_Session_Bool_Exp>;
};


/** query root */
export type Query_RootPoker_Session_By_PkArgs = {
  id: Scalars['Int'];
};


/** query root */
export type Query_RootPoker_User_SessionArgs = {
  distinct_on?: Maybe<Array<Poker_User_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_User_Session_Order_By>>;
  where?: Maybe<Poker_User_Session_Bool_Exp>;
};


/** query root */
export type Query_RootPoker_User_Session_AggregateArgs = {
  distinct_on?: Maybe<Array<Poker_User_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_User_Session_Order_By>>;
  where?: Maybe<Poker_User_Session_Bool_Exp>;
};


/** query root */
export type Query_RootPoker_User_Session_By_PkArgs = {
  session_id: Scalars['Int'];
  user_id: Scalars['String'];
};


/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** query root */
export type Query_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};

/** subscription root */
export type Subscription_Root = {
   __typename?: 'subscription_root';
  /** fetch data from the table: "online_users" */
  online_users: Array<Online_Users>;
  /** fetch aggregated fields from the table: "online_users" */
  online_users_aggregate: Online_Users_Aggregate;
  /** fetch data from the table: "poker_session" */
  poker_session: Array<Poker_Session>;
  /** fetch aggregated fields from the table: "poker_session" */
  poker_session_aggregate: Poker_Session_Aggregate;
  /** fetch data from the table: "poker_session" using primary key columns */
  poker_session_by_pk?: Maybe<Poker_Session>;
  /** fetch data from the table: "poker_user_session" */
  poker_user_session: Array<Poker_User_Session>;
  /** fetch aggregated fields from the table: "poker_user_session" */
  poker_user_session_aggregate: Poker_User_Session_Aggregate;
  /** fetch data from the table: "poker_user_session" using primary key columns */
  poker_user_session_by_pk?: Maybe<Poker_User_Session>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
};


/** subscription root */
export type Subscription_RootOnline_UsersArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Online_Users_Order_By>>;
  where?: Maybe<Online_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootOnline_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Online_Users_Order_By>>;
  where?: Maybe<Online_Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoker_SessionArgs = {
  distinct_on?: Maybe<Array<Poker_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_Session_Order_By>>;
  where?: Maybe<Poker_Session_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoker_Session_AggregateArgs = {
  distinct_on?: Maybe<Array<Poker_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_Session_Order_By>>;
  where?: Maybe<Poker_Session_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoker_Session_By_PkArgs = {
  id: Scalars['Int'];
};


/** subscription root */
export type Subscription_RootPoker_User_SessionArgs = {
  distinct_on?: Maybe<Array<Poker_User_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_User_Session_Order_By>>;
  where?: Maybe<Poker_User_Session_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoker_User_Session_AggregateArgs = {
  distinct_on?: Maybe<Array<Poker_User_Session_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Poker_User_Session_Order_By>>;
  where?: Maybe<Poker_User_Session_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootPoker_User_Session_By_PkArgs = {
  session_id: Scalars['Int'];
  user_id: Scalars['String'];
};


/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>;
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  order_by?: Maybe<Array<Users_Order_By>>;
  where?: Maybe<Users_Bool_Exp>;
};


/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['String'];
};


/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>;
  _gt?: Maybe<Scalars['timestamptz']>;
  _gte?: Maybe<Scalars['timestamptz']>;
  _in?: Maybe<Array<Scalars['timestamptz']>>;
  _is_null?: Maybe<Scalars['Boolean']>;
  _lt?: Maybe<Scalars['timestamptz']>;
  _lte?: Maybe<Scalars['timestamptz']>;
  _neq?: Maybe<Scalars['timestamptz']>;
  _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
   __typename?: 'users';
  created_at: Scalars['timestamptz'];
  id: Scalars['String'];
  last_seen: Scalars['timestamptz'];
  name: Scalars['String'];
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
   __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
   __typename?: 'users_aggregate_fields';
  count?: Maybe<Scalars['Int']>;
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>;
  distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>;
  max?: Maybe<Users_Max_Order_By>;
  min?: Maybe<Users_Min_Order_By>;
};

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  _not?: Maybe<Users_Bool_Exp>;
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>;
  created_at?: Maybe<Timestamptz_Comparison_Exp>;
  id?: Maybe<String_Comparison_Exp>;
  last_seen?: Maybe<Timestamptz_Comparison_Exp>;
  name?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
   __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
   __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
   __typename?: 'users_mutation_response';
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int'];
  /** data of the affected rows by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns: Array<Users_Update_Column>;
  where?: Maybe<Users_Bool_Exp>;
};

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  created_at?: Maybe<Order_By>;
  id?: Maybe<Order_By>;
  last_seen?: Maybe<Order_By>;
  name?: Maybe<Order_By>;
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  last_seen?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name'
}

export type CreatePokerSessionMutationVariables = {
  name: Scalars['String'];
  owner_id: Scalars['String'];
};


export type CreatePokerSessionMutation = (
  { __typename?: 'mutation_root' }
  & { insert_poker_session?: Maybe<(
    { __typename?: 'poker_session_mutation_response' }
    & Pick<Poker_Session_Mutation_Response, 'affected_rows'>
    & { returning: Array<(
      { __typename?: 'poker_session' }
      & Pick<Poker_Session, 'id'>
    )> }
  )> }
);

export type UpsetUserSessionMutationVariables = {
  sessionId: Scalars['Int'];
  userId: Scalars['String'];
};


export type UpsetUserSessionMutation = (
  { __typename?: 'mutation_root' }
  & { insert_poker_user_session?: Maybe<(
    { __typename?: 'poker_user_session_mutation_response' }
    & Pick<Poker_User_Session_Mutation_Response, 'affected_rows'>
  )> }
);

export type GetPokerSessionSubscriptionVariables = {
  id: Scalars['Int'];
};


export type GetPokerSessionSubscription = (
  { __typename?: 'subscription_root' }
  & { poker_session_by_pk?: Maybe<(
    { __typename?: 'poker_session' }
    & Pick<Poker_Session, 'id' | 'name' | 'owner_id'>
    & { user_sessions_aggregate: (
      { __typename?: 'poker_user_session_aggregate' }
      & { aggregate?: Maybe<(
        { __typename?: 'poker_user_session_aggregate_fields' }
        & Pick<Poker_User_Session_Aggregate_Fields, 'count'>
      )> }
    ), user_sessions: Array<(
      { __typename?: 'poker_user_session' }
      & Pick<Poker_User_Session, 'current_vote'>
      & { user: (
        { __typename?: 'users' }
        & Pick<Users, 'name' | 'last_seen' | 'id'>
      ) }
    )> }
  )> }
);

export type UpdateVoteMutationVariables = {
  sessionId: Scalars['Int'];
  userId: Scalars['String'];
  vote?: Maybe<Scalars['String']>;
};


export type UpdateVoteMutation = (
  { __typename?: 'mutation_root' }
  & { update_poker_user_session?: Maybe<(
    { __typename?: 'poker_user_session_mutation_response' }
    & Pick<Poker_User_Session_Mutation_Response, 'affected_rows'>
  )> }
);

export type UpdateLastSeenMutationVariables = {
  userId: Scalars['String'];
  lastSeen: Scalars['timestamptz'];
};


export type UpdateLastSeenMutation = (
  { __typename?: 'mutation_root' }
  & { update_users?: Maybe<(
    { __typename?: 'users_mutation_response' }
    & Pick<Users_Mutation_Response, 'affected_rows'>
  )> }
);

export type GetOnlineUsersSubscriptionVariables = {};


export type GetOnlineUsersSubscription = (
  { __typename?: 'subscription_root' }
  & { online_users: Array<(
    { __typename?: 'online_users' }
    & { user: Array<(
      { __typename?: 'users' }
      & Pick<Users, 'id' | 'name' | 'last_seen'>
    )> }
  )> }
);


export const CreatePokerSessionDocument = gql`
    mutation createPokerSession($name: String!, $owner_id: String!) {
  insert_poker_session(objects: {name: $name, owner_id: $owner_id}) {
    affected_rows
    returning {
      id
    }
  }
}
    `;
export type CreatePokerSessionMutationFn = ApolloReactCommon.MutationFunction<CreatePokerSessionMutation, CreatePokerSessionMutationVariables>;

/**
 * __useCreatePokerSessionMutation__
 *
 * To run a mutation, you first call `useCreatePokerSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePokerSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPokerSessionMutation, { data, loading, error }] = useCreatePokerSessionMutation({
 *   variables: {
 *      name: // value for 'name'
 *      owner_id: // value for 'owner_id'
 *   },
 * });
 */
export function useCreatePokerSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreatePokerSessionMutation, CreatePokerSessionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreatePokerSessionMutation, CreatePokerSessionMutationVariables>(CreatePokerSessionDocument, baseOptions);
      }
export type CreatePokerSessionMutationHookResult = ReturnType<typeof useCreatePokerSessionMutation>;
export type CreatePokerSessionMutationResult = ApolloReactCommon.MutationResult<CreatePokerSessionMutation>;
export type CreatePokerSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreatePokerSessionMutation, CreatePokerSessionMutationVariables>;
export const UpsetUserSessionDocument = gql`
    mutation upsetUserSession($sessionId: Int!, $userId: String!) {
  insert_poker_user_session(objects: {user_id: $userId, session_id: $sessionId}, on_conflict: {constraint: poker_user_session_pkey, update_columns: current_vote}) {
    affected_rows
  }
}
    `;
export type UpsetUserSessionMutationFn = ApolloReactCommon.MutationFunction<UpsetUserSessionMutation, UpsetUserSessionMutationVariables>;

/**
 * __useUpsetUserSessionMutation__
 *
 * To run a mutation, you first call `useUpsetUserSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsetUserSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsetUserSessionMutation, { data, loading, error }] = useUpsetUserSessionMutation({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUpsetUserSessionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpsetUserSessionMutation, UpsetUserSessionMutationVariables>) {
        return ApolloReactHooks.useMutation<UpsetUserSessionMutation, UpsetUserSessionMutationVariables>(UpsetUserSessionDocument, baseOptions);
      }
export type UpsetUserSessionMutationHookResult = ReturnType<typeof useUpsetUserSessionMutation>;
export type UpsetUserSessionMutationResult = ApolloReactCommon.MutationResult<UpsetUserSessionMutation>;
export type UpsetUserSessionMutationOptions = ApolloReactCommon.BaseMutationOptions<UpsetUserSessionMutation, UpsetUserSessionMutationVariables>;
export const GetPokerSessionDocument = gql`
    subscription getPokerSession($id: Int!) {
  poker_session_by_pk(id: $id) {
    id
    name
    owner_id
    user_sessions_aggregate {
      aggregate {
        count
      }
    }
    user_sessions(order_by: {user_id: asc}) {
      current_vote
      user {
        name
        last_seen
        id
      }
    }
  }
}
    `;

/**
 * __useGetPokerSessionSubscription__
 *
 * To run a query within a React component, call `useGetPokerSessionSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetPokerSessionSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPokerSessionSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPokerSessionSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<GetPokerSessionSubscription, GetPokerSessionSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<GetPokerSessionSubscription, GetPokerSessionSubscriptionVariables>(GetPokerSessionDocument, baseOptions);
      }
export type GetPokerSessionSubscriptionHookResult = ReturnType<typeof useGetPokerSessionSubscription>;
export type GetPokerSessionSubscriptionResult = ApolloReactCommon.SubscriptionResult<GetPokerSessionSubscription>;
export const UpdateVoteDocument = gql`
    mutation updateVote($sessionId: Int!, $userId: String!, $vote: String) {
  update_poker_user_session(where: {session_id: {_eq: $sessionId}, user_id: {_eq: $userId}}, _set: {current_vote: $vote}) {
    affected_rows
  }
}
    `;
export type UpdateVoteMutationFn = ApolloReactCommon.MutationFunction<UpdateVoteMutation, UpdateVoteMutationVariables>;

/**
 * __useUpdateVoteMutation__
 *
 * To run a mutation, you first call `useUpdateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVoteMutation, { data, loading, error }] = useUpdateVoteMutation({
 *   variables: {
 *      sessionId: // value for 'sessionId'
 *      userId: // value for 'userId'
 *      vote: // value for 'vote'
 *   },
 * });
 */
export function useUpdateVoteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateVoteMutation, UpdateVoteMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateVoteMutation, UpdateVoteMutationVariables>(UpdateVoteDocument, baseOptions);
      }
export type UpdateVoteMutationHookResult = ReturnType<typeof useUpdateVoteMutation>;
export type UpdateVoteMutationResult = ApolloReactCommon.MutationResult<UpdateVoteMutation>;
export type UpdateVoteMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateVoteMutation, UpdateVoteMutationVariables>;
export const UpdateLastSeenDocument = gql`
    mutation updateLastSeen($userId: String!, $lastSeen: timestamptz!) {
  update_users(where: {id: {_eq: $userId}}, _set: {last_seen: $lastSeen}) {
    affected_rows
  }
}
    `;
export type UpdateLastSeenMutationFn = ApolloReactCommon.MutationFunction<UpdateLastSeenMutation, UpdateLastSeenMutationVariables>;

/**
 * __useUpdateLastSeenMutation__
 *
 * To run a mutation, you first call `useUpdateLastSeenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLastSeenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLastSeenMutation, { data, loading, error }] = useUpdateLastSeenMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      lastSeen: // value for 'lastSeen'
 *   },
 * });
 */
export function useUpdateLastSeenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLastSeenMutation, UpdateLastSeenMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateLastSeenMutation, UpdateLastSeenMutationVariables>(UpdateLastSeenDocument, baseOptions);
      }
export type UpdateLastSeenMutationHookResult = ReturnType<typeof useUpdateLastSeenMutation>;
export type UpdateLastSeenMutationResult = ApolloReactCommon.MutationResult<UpdateLastSeenMutation>;
export type UpdateLastSeenMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateLastSeenMutation, UpdateLastSeenMutationVariables>;
export const GetOnlineUsersDocument = gql`
    subscription getOnlineUsers {
  online_users {
    user {
      id
      name
      last_seen
    }
  }
}
    `;

/**
 * __useGetOnlineUsersSubscription__
 *
 * To run a query within a React component, call `useGetOnlineUsersSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetOnlineUsersSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnlineUsersSubscription({
 *   variables: {
 *   },
 * });
 */
export function useGetOnlineUsersSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<GetOnlineUsersSubscription, GetOnlineUsersSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<GetOnlineUsersSubscription, GetOnlineUsersSubscriptionVariables>(GetOnlineUsersDocument, baseOptions);
      }
export type GetOnlineUsersSubscriptionHookResult = ReturnType<typeof useGetOnlineUsersSubscription>;
export type GetOnlineUsersSubscriptionResult = ApolloReactCommon.SubscriptionResult<GetOnlineUsersSubscription>;