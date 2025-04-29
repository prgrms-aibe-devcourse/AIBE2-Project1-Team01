import React, { useState } from 'react';
import DatePickerModal from '../../components/DatePickerModal';
import './PlanPage.css';

const PlanPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <div>
            {isModalOpen && (
                <div className="modal-overlay">
                <div className="modal-wrapper">
                    <DatePickerModal  />
                </div>
                </div>
            )}
        </div>
    );
};