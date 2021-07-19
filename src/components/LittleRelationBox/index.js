import { ProfileRelationsBoxWrapper } from '../ProfileRelations';

function LittleRelationBox(props) {
    return (
        <ProfileRelationsBoxWrapper>
            <h2 className='smallTitle'>
                {props.title} ({props.arrayProfiles.length})
            </h2>

            <ul>
                {props.arrayProfiles.slice(0, 6).map((profile) => {
                    return (
                        <li key={profile.id ? profile.id : profile.name}>
                            <a href={profile.url} key={profile.name} target="_blank">
                                <img src={profile.image} alt={profile.name}/>
                                <span>{profile.name}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </ProfileRelationsBoxWrapper>
    )
};

export default LittleRelationBox;