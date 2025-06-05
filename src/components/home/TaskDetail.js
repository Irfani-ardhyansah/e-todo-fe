
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faDoorOpen,
    faCheckCircle,
    faTimesCircle,
    faHourglassHalf,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';

const TaskDetail = ({taskDetail}) => { 
    if(!taskDetail) return null;

    const statusIconMap = {
        'open': faDoorOpen,
        'in_review': faSpinner,
        'closed': faTimesCircle,
        'in_progress': faHourglassHalf,
        'finished': faCheckCircle
    };

    return(
        <>
            <div className="content-header">
                <div className="content-sub-title">
                    <FontAwesomeIcon
                        icon={statusIconMap[taskDetail.status?.toLowerCase()] || faSpinner}
                        className={`status-icon ${taskDetail.status}`}
                        title={taskDetail.status}
                    />
                    <p className="title-code">
                        {taskDetail.code}
                    </p>
                </div>
                <h4>{taskDetail.name}</h4>
            </div>

            <div className="content">
                <b>Description</b>
                <div
                dangerouslySetInnerHTML={{ __html: taskDetail.description }}
                ></div>
            </div>
        </>
    )
}

export default TaskDetail;
