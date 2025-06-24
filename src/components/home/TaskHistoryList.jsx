// components/TaskHistoryList.jsx
import React from "react";
import { formatDate } from "../../utils/dateHelper";

const TaskHistoryList = ({ histories }) => {
    return histories.map((item) => (
        <React.Fragment key={item.uuid}>
            <li className="list-group-item d-flex justify-content-between timer-history-divider">
                <div className="left-side">{formatDate(item.start_date)} - {formatDate(item.end_date)}</div>
                <div className="right-side">{item.total_time}</div>
            </li>
            <li className="list-group-item timer-history">
                {item.data_detail.map((detail) => (
                    <React.Fragment key={`${item.uuid}-${detail.date}`}>
                        <div className="d-flex justify-content-between mb-1">
                            <div className="left-side">{formatDate(detail.date)}</div>
                            <div className="right-side">00:00:00</div>
                        </div>
                        <hr />
                        {detail.data_grouped.map((g, index) => (
                            <div className="d-flex justify-content-between mt-1 timer-history-content" key={`${item.uuid}-${detail.date}-${index}`}>
                                <div className="left-side">{index + 1}. {g.task_name}</div>
                                <div className="right-side">{g.time}</div>
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </li>
        </React.Fragment>
    ));
};

export default TaskHistoryList;
