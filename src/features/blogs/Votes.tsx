import { votePost } from "../../services/blogServices";


interface VoteData{
    post_id : number;
    dir:number
  }
  interface VoteResp{
    message:string
  }

  const Votes = (): JSX.Element => {

    const handleVote = votePost;

    return <button onClick={handleVote}></button>
  }