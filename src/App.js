import React, { useState, useEffect, useReducer } from 'react';
import { Container, Text, Button, Title , Box, Stack, Drawer, NativeSelect, Tabs, Progress, Radio, Center, Table, NumberInput, Group , Modal } from '@mantine/core';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IconCheck } from '@tabler/icons-react';
import './App.css'
import {datacoreprocesses}             from './SchoolCoreProcesses'
import {dataschoolinstructorresource}  from './SchoolInstructorResourceData'
import {dataschoollearningenvironment} from './SchoolLearningEnvironmentData'
import {dataschooltotalstudentdevdata} from './SchoolTotalStudentDevData'
import {dataschoolsustainabilitydata}  from './SchoolSustainabilityData'
import {dataschoolacademicperfdata}    from './SchoolAcademicPerfData'
import {dataschoolsshedata}            from './SchoolSsheData'
import {dataschoolacademicfirsttermdata} from './SchoolAcademicFirstTermData'
import { get, set } from 'idb-keyval';


const teacher_first_term_value_2022          = 'teacher_first_term_value_2022';
const teacher_first_term_value_2023          = 'teacher_first_term_value_2023';
const teacher_first_term_questions_2022      = 'teacher_first_term_questions_2022';
const teacher_first_term_questions_2023      = 'teacher_first_term_questions_2023';

const teacher_second_term_value_2022          = 'teacher_second_term_value_2022';
const teacher_second_term_value_2023          = 'teacher_second_term_value_2023';
const teacher_second_term_questions_2022      = 'teacher_second_term_questions_2022';
const teacher_second_term_questions_2023      = 'teacher_second_term_questions_2023';

const teacher_third_term_value_2022          = 'teacher_third_term_value_2022';
const teacher_third_term_value_2023          = 'teacher_third_term_value_2023';
const teacher_third_term_questions_2022      = 'teacher_third_term_questions_2022';
const teacher_third_term_questions_2023      = 'teacher_third_term_questions_2023';

const academic_first_term_value_2022         = 'academic_first_term_value_2022';
const academic_first_term_value_2023         = 'academic_first_term_value_2023';
const academic_first_term_questions_2022     = 'academic_first_term_questions_2022';
const academic_first_term_questions_2023     = 'academic_first_term_questions_2023';

const academic_second_term_value_2022         = 'academic_second_term_value_2022';
const academic_second_term_value_2023         = 'academic_second_term_value_2023';
const academic_second_term_questions_2022     = 'academic_second_term_questions_2022';
const academic_second_term_questions_2023     = 'academic_second_term_questions_2023';

const academic_third_term_value_2022         = 'academic_third_term_value_2022';
const academic_third_term_value_2023         = 'academic_third_term_value_2023';
const academic_third_term_questions_2022     = 'academic_third_term_questions_2022';
const academic_third_term_questions_2023     = 'academic_third_term_questions_2023';

const academic_external_value_2022           = 'academic_external_value_2022';
const academic_external_value_2023           = 'academic_external_value_2023';
const academic_external_questions_2022       = 'academic_external_questions_2022';
const academic_external_questions_2023       = 'academic_external_questions_2023';

const academic_minimum_subjects              = 7;

const standards_coreprocesses_value_2022     = 'standards_coreprocesses_value_2022';
const standards_coreprocesses_value_2023     = 'standards_coreprocesses_value_2023';
const standards_coreprocesses_questions_2022 = 'standards_coreprocesses_questions_2022';
const standards_coreprocesses_questions_2023 = 'standards_coreprocesses_questions_2023';
const final_total_coreprocesses              = 145;

const standards_instructor_value_2022     = 'standards_instructor_value_2022';
const standards_instructor_value_2023     = 'standards_instructor_value_2023';
const standards_instructor_questions_2022 = 'standards_instructor_questions_2022';
const standards_instructor_questions_2023 = 'standards_instructor_questions_2023';
const final_total_instructor              = 40;

const standards_learning_value_2022     = 'standards_learning_value_2022';
const standards_learning_value_2023     = 'standards_learning_value_2023';
const standards_learning_questions_2022 = 'standards_learning_questions_2022';
const standards_learning_questions_2023 = 'standards_learning_questions_2023';
const final_total_learning              = 165;

const standards_total_value_2022     = 'standards_total_value_2022';
const standards_total_value_2023     = 'standards_total_value_2023';
const standards_total_questions_2022 = 'standards_total_questions_2022';
const standards_total_questions_2023 = 'standards_total_questions_2023';
const final_total_total              = 250;

const standards_sustainability_value_2022     = 'standards_sustainability_value_2022';
const standards_sustainability_value_2023     = 'standards_sustainability_value_2023';
const standards_sustainability_questions_2022 = 'standards_sustainability_questions_2022';
const standards_sustainability_questions_2023 = 'standards_sustainability_questions_2023';
const final_total_sustainability              = 275;

const standards_academic_value_2022     = 'standards_academic_value_2022';
const standards_academic_value_2023     = 'standards_academic_value_2023';
const standards_academic_questions_2022 = 'standards_academic_questions_2022';
const standards_academic_questions_2023 = 'standards_academic_questions_2023';
const final_total_academic              = 75;

const standards_sshe_value_2022     = 'standards_sshe_value_2022';
const standards_sshe_value_2023     = 'standards_sshe_value_2023';
const standards_sshe_questions_2022 = 'standards_sshe_questions_2022';
const standards_sshe_questions_2023 = 'standards_sshe_questions_2023';
const final_total_sshe              = 215;

function App() {

  const [selectedYear, setSelectedYear] = useState('None');
  const [selectedYearAcademic, setSelectedYearAcademic]  = useState('None');
  const [selectedYearTeacher, setSelectedYearTeacher]    = useState('None');
  const [selectedTeacherLevel, setSelectedTeacherLevel]  = useState('None');
  const [selectedTeacherNumber, setSelectedTeacherNumber] = useState('None');

  const [drawerOpenedSE, setDrawerOpenedSE] = useState(false);
  const [drawerOpenedTEA, setDrawerOpenedTEA] = useState(false);
  const [drawerOpenedACA, setDrawerOpenedACA] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);

  const [currentQuestionIndexCp, setCurrentQuestionIndexCp] = useState(0);
  const [progressQuestionIndexCp, setProgressQuestionIndexCp] = useState(0);
  const [selectedValueCp, setSelectedValueCp] = useState(null);
  const [totalValueCp, setTotalValueCp] = useState(0);
  const [staticCoreProcess,setStaticCoreProcess] = useState(0);
  const [dataCoreProcesses, setCoreProcessesData] = useState(datacoreprocesses);

  const [currentQuestionIndexIns, setCurrentQuestionIndexIns] = useState(0);
  const [progressQuestionIndexIns, setProgressQuestionIndexIns] = useState(0);
  const [selectedValueIns, setSelectedValueIns] = useState(null);
  const [totalValueIns, setTotalValueIns] = useState(0);  
  const [staticInstructorResource,setStaticInstructorResource] = useState(0);
  const [dataInstructorResource, setInstructorResourceData] = useState(dataschoolinstructorresource);

  const [currentQuestionIndexLearn, setCurrentQuestionIndexLearn] = useState(0);
  const [progressQuestionIndexLearn, setProgressQuestionIndexLearn] = useState(0);
  const [selectedValueLearn, setSelectedValueLearn] = useState(null);
  const [totalValueLearn, setTotalValueLearn] = useState(0);
  const [staticLearningEnv,setStaticLearningEnv] = useState(0);
  const [dataLearningEnv, setLearningEnvData] = useState(dataschoollearningenvironment);

  const [currentQuestionIndexTotal, setCurrentQuestionIndexTotal] = useState(0);
  const [progressQuestionIndexTotal, setProgressQuestionIndexTotal] = useState(0);
  const [selectedValueTotal, setSelectedValueTotal] = useState(null);
  const [totalValueTotal, setTotalValueTotal] = useState(0);
  const [staticTotalStudent,setStaticTotalStudent] = useState(0);
  const [dataTotalStudent, setTotalStudentData] = useState(dataschooltotalstudentdevdata);

  const [currentQuestionIndexSus, setCurrentQuestionIndexSus] = useState(0);
  const [progressQuestionIndexSus, setProgressQuestionIndexSus] = useState(0);
  const [selectedValueSus, setSelectedValueSus] = useState(null);
  const [totalValueSus, setTotalValueSus] = useState(0);
  const [staticSustainability,setStaticSustainability] = useState(0);
  const [dataSustainability, setSustainabilityData] = useState(dataschoolsustainabilitydata);

  const [currentQuestionIndexAca, setCurrentQuestionIndexAca] = useState(0);
  const [progressQuestionIndexAca, setProgressQuestionIndexAca] = useState(0);
  const [selectedValueAca, setSelectedValueAca] = useState(null);
  const [totalValueAca, setTotalValueAca] = useState(0);
  const [staticAcademic, setStaticAcademic] = useState(0);
  const [dataAcademic, setAcademicData] = useState(dataschoolacademicperfdata);

  const [currentQuestionIndexSshe, setCurrentQuestionIndexSshe] = useState(0);
  const [progressQuestionIndexSshe, setProgressQuestionIndexSshe] = useState(0);
  const [selectedValueSshe, setSelectedValueSshe] = useState(null);
  const [totalValueSshe, setTotalValueSshe] = useState(0);
  const [staticSshe, setStaticSshe] = useState(0);
  const [dataSshe, setSsheData] = useState(dataschoolsshedata);

  const [currentQuestionIndexAcademicFirstTerm, setCurrentQuestionIndexAcademicFirstTerm] = useState(0);
  const [progressQuestionIndexAcademicFirstTerm, setProgressQuestionIndexAcademicFirstTerm] = useState(0);
  const [selectedValueAcademicFirstTerm,  setSelectedValueAcademicFirstTerm] = useState('');
  const [dataAcademicFirstTerm, setAcademicFirstTermData] = useState(dataschoolacademicfirsttermdata);

  const [currentQuestionIndexAcademicSecondTerm, setCurrentQuestionIndexAcademicSecondTerm] = useState(0);
  const [progressQuestionIndexAcademicSecondTerm, setProgressQuestionIndexAcademicSecondTerm] = useState(0);
  const [selectedValueAcademicSecondTerm,  setSelectedValueAcademicSecondTerm] = useState('');
  const [dataAcademicSecondTerm, setAcademicSecondTermData] = useState(dataschoolacademicfirsttermdata);

  const [currentQuestionIndexAcademicThirdTerm, setCurrentQuestionIndexAcademicThirdTerm] = useState(0);
  const [progressQuestionIndexAcademicThirdTerm, setProgressQuestionIndexAcademicThirdTerm] = useState(0);
  const [selectedValueAcademicThirdTerm,  setSelectedValueAcademicThirdTerm] = useState('');
  const [dataAcademicThirdTerm, setAcademicThirdTermData] = useState(dataschoolacademicfirsttermdata);

  const [currentQuestionIndexAcademicExternal, setCurrentQuestionIndexAcademicExternal] = useState(0);
  const [progressQuestionIndexAcademicExternal, setProgressQuestionIndexAcademicExternal] = useState(0);
  const [selectedValueAcademicExternal,  setSelectedValueAcademicExternal] = useState('');
  const [dataAcademicExternal, setAcademicExternalData] = useState(dataschoolacademicfirsttermdata);

  const [valueGradeAcademic, setGradeAcademic] = useState("");
  const [totalTransitionIndexAcademic, setTransitionIndexValueAcademic] = useState(0.0);
  const [totalDragIndexAcademic, setDragIndexValueAcademic] = useState(0.00);

  const [valueGradeAcademicFirstTerm, setGradeAcademicFirstTerm] = useState("");
  const [totalTransitionIndexAcademicFirstTerm, setTransitionIndexValueAcademicFirstTerm] = useState(0.0);
  const [totalDragIndexAcademicFirstTerm, setDragIndexValueAcademicFirstTerm] = useState(0.00);

  const [valueGradeAcademicSecondTerm, setGradeAcademicSecondTerm] = useState("");
  const [totalTransitionIndexAcademicSecondTerm, setTransitionIndexValueAcademicSecondTerm] = useState(0.0);
  const [totalDragIndexAcademicSecondTerm, setDragIndexValueAcademicSecondTerm] = useState(0.00);

  const [valueGradeAcademicThirdTerm, setGradeAcademicThirdTerm] = useState("");
  const [totalTransitionIndexAcademicThirdTerm, setTransitionIndexValueAcademicThirdTerm] = useState(0.0);
  const [totalDragIndexAcademicThirdTerm, setDragIndexValueAcademicThirdTerm] = useState(0.00);

  const [valueGradeAcademicExternal, setGradeAcademicExternal] = useState("");
  const [totalTransitionIndexAcademicExternal, setTransitionIndexValueAcademicExternal] = useState(0.0);
  const [totalDragIndexAcademicExternal, setDragIndexValueAcademicExternal] = useState(0.00);

  //const [currentQuestionIndexTeacherFirstTerm, setCurrentQuestionIndexTeacherFirstTerm] = useState(0);
  //const [progressQuestionIndexTeacherFirstTerm, setProgressQuestionIndexTeacherFirstTerm] = useState(0);
  //const [selectedValueTeacherFirstTerm,  setSelectedValueTeacherFirstTerm] = useState('');

  const [dataTeacherFirstTerm, setTeacherFirstTerm] = useState([]);
  const [dataTeacherFirstTermIndex, setTeacherFirstTermIndex] = useState(false);
  const [dataTeacherSecondTerm, setTeacherSecondTerm] = useState([]);
  const [dataTeacherSecondTermIndex, setTeacherSecondTermIndex] = useState(false);
  const [dataTeacherThirdTerm, setTeacherThirdTerm] = useState([]);
  const [dataTeacherThirdTermIndex, setTeacherThirdTermIndex] = useState(false);

  const [dataTeacherTab, setTeacherTab] = useState('first-term');
  const [dataDashboardEvaluation, setDashboardEvaluation] = useState([]);
  const [dataDashboardAcademic, setDashboardAcademic] = useState([]);

  const [valueGeneralCompliance, setValueGeneralCompliance] = useState(0);
  const [valueGeneralCompliancePremium, setValueGeneralCompliancePremium] = useState(0);
  const [valueStemCompliance, setValueStemCompliance] = useState(0);
  const [valueStemCompliancePremium, setValueStemCompliancePremium] = useState(0);
  const [valueArtsSocialCompliance, setValueArtsSocialCompliance] = useState(0);
  const [valueArtsSocialCompliancePremium, setValueArtsSocialCompliancePremium] = useState(0);

  const [childPosition, setChildPosition] = useState(50);
  const [childPositionTwo, setChildPositionTwo] = useState(400);
  const [childPositionThree, setChildPositionThree] = useState(50);
  const [childPositionFour, setChildPositionFour] = useState(400);

  const handleMouseDown = (event) => {
    const startY = event.clientY;
    const initialPosition = childPosition;

    const onMouseMove = (moveEvent) => {
      const newY = initialPosition + moveEvent.clientY - startY;
      setChildPosition(newY);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleMouseDownTwo = (event) => {
    const startY = event.clientY;
    const initialPosition = childPositionTwo;

    const onMouseMove = (moveEvent) => {
      const newY = initialPosition + moveEvent.clientY - startY;
      setChildPositionTwo(newY);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleMouseDownThree = (event) => {
    const startY = event.clientY;
    const initialPosition = childPositionThree;

    const onMouseMove = (moveEvent) => {
      const newY = initialPosition + moveEvent.clientY - startY;
      setChildPositionThree(newY);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
 
  const handleMouseDownFour = (event) => {
    const startY = event.clientY;
    const initialPosition = childPositionFour;

    const onMouseMove = (moveEvent) => {
      const newY = initialPosition + moveEvent.clientY - startY;
      setChildPositionFour(newY);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleDrawerOpenSE = () => {
    setDrawerOpenedSE(true);
  };

  const handleDrawerCloseSE = () => {
    setDrawerOpenedSE(false);
    setSelectedYear('None');   
  };  

  const handleDrawerOpenACA = () => {
    setDrawerOpenedACA(true);
  };

  const handleDrawerCloseACA = () => {
    setDrawerOpenedACA(false);
    setSelectedYearAcademic('None'); 
  }

  const handleDrawerOpenTEA = () => {
    setDrawerOpenedTEA(true);
  };

  const handleDrawerCloseTEA = () => {
    setDrawerOpenedTEA(false);
    setSelectedYearTeacher('None'); 
    setTeacherFirstTerm([])
    setTeacherSecondTerm([])
    setTeacherThirdTerm([])
  }

  const handleDrawerOpenModal = () => {
    setModalOpened(true);
  };

  const handleDrawerCloseModal = () => {
    setModalOpened(false);
  };

  //**Static Values */
  const staticCoreProcesses = async () => {
    const value_question_2022 = await get(standards_coreprocesses_questions_2022);
    const value_question_2023 = await get(standards_coreprocesses_questions_2023);
    if ( value_question_2023 === dataCoreProcesses.length ) {
      const value_2023 = await get(standards_coreprocesses_value_2023);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2023) ) / final_total_coreprocesses )  * 100 );
      setStaticCoreProcess(final_sum)
    }
    else if ( value_question_2022 === dataCoreProcesses.length ){
      const value_2022 = await get(standards_coreprocesses_value_2022);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2022) ) / final_total_coreprocesses )  * 100 );
      setStaticCoreProcess(final_sum)
    }    
  }

  const staticInstructorResources = async () => {
    const value_question_2022 = await get(standards_instructor_questions_2022);
    const value_question_2023 = await get(standards_instructor_questions_2023);
    if ( value_question_2023 === dataInstructorResource.length ) {
      const value_2023 = await get(standards_instructor_value_2023);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2023) ) / final_total_instructor )  * 100 );
      setStaticInstructorResource(final_sum)
    }
    else if ( value_question_2022 === dataInstructorResource.length ){
      const value_2022 = await get(standards_instructor_value_2022);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2022) ) / final_total_instructor )  * 100 );
      setStaticInstructorResource(final_sum)
    }    
  }

  const staticLearningEnvs = async () => {
    const value_question_2022 = await get(standards_learning_questions_2022);
    const value_question_2023 = await get(standards_learning_questions_2023);
    if ( value_question_2023 === dataLearningEnv.length ) {
      const value_2023 = await get(standards_learning_value_2023);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2023) ) / final_total_learning )  * 100 );
      setStaticLearningEnv(final_sum)
    }
    else if ( value_question_2022 === dataLearningEnv.length ){
      const value_2022 = await get(standards_learning_value_2022);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2022) ) / final_total_learning )  * 100 );
      setStaticLearningEnv(final_sum)
    }    
  }
  
  const staticTotalStudents = async () => {
    const value_question_2022 = await get(standards_total_questions_2022);
    const value_question_2023 = await get(standards_total_questions_2023);
    if ( value_question_2023 === dataTotalStudent.length ) {
      const value_2023 = await get(standards_total_value_2023);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2023) ) / final_total_total )  * 100 );
      setStaticTotalStudent(final_sum);
    }
    else if ( value_question_2022 === dataTotalStudent.length ){
      const value_2022 = await get(standards_total_value_2022);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2022) ) / final_total_total )  * 100 );
      setStaticTotalStudent(final_sum);
    }    
  }

  const staticSustainabilities = async () => {
    const value_question_2022 = await get(standards_sustainability_questions_2022);
    const value_question_2023 = await get(standards_sustainability_questions_2023);
    if ( value_question_2023 === dataSustainability.length ) {
      const value_2023 = await get(standards_sustainability_value_2023);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2023) ) / final_total_sustainability )  * 100 );
      setStaticSustainability(final_sum);
    }
    else if ( value_question_2022 === dataSustainability.length ){
      const value_2022 = await get(standards_sustainability_value_2022);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2022) ) / final_total_sustainability )  * 100 );
      setStaticSustainability(final_sum);
    }    
  }

  const staticAcademics = async () => {
    const value_question_2022 = await get(standards_academic_questions_2022);
    const value_question_2023 = await get(standards_academic_questions_2023);
    if ( value_question_2023 === dataAcademic.length ) {
      const value_2023 = await get(standards_academic_value_2023);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2023) ) / final_total_academic )  * 100 );
      setStaticAcademic(final_sum);
    }
    else if ( value_question_2022 === dataAcademic.length ){
      const value_2022 = await get(standards_academic_value_2022);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2022) ) / final_total_academic )  * 100 );
      setStaticAcademic(final_sum);
    }    
  }

  const staticSshes = async () => {
    const value_question_2022 = await get(standards_sshe_questions_2022);
    const value_question_2023 = await get(standards_sshe_questions_2023);
    if ( value_question_2023 === dataSshe.length ) {
      const value_2023 = await get(standards_sshe_value_2023);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2023) ) / final_total_sshe )  * 100 );
      setStaticSshe(final_sum);
    }
    else if ( value_question_2022 === dataSshe.length ){
      const value_2022 = await get(standards_sshe_value_2022);
      let final_sum = parseInt( ( sumValues( JSON.parse(value_2022) ) / final_total_sshe )  * 100 );
      setStaticSshe(final_sum);
    }    
  }

  const staticAcademicAllTerms = async () => {
    const value_question_first_2022  = await get(academic_first_term_questions_2022);
    const value_question_first_2023  = await get(academic_first_term_questions_2023);
    const value_question_second_2022 = await get(academic_second_term_questions_2022);
    const value_question_second_2023 = await get(academic_second_term_questions_2023);
    const value_question_third_2022  = await get(academic_third_term_questions_2022);
    const value_question_third_2023  = await get(academic_third_term_questions_2023);
  //  const value_question_external_2022 = await get(academic_external_questions_2022);
  //  const value_question_external_2023 = await get(academic_external_questions_2023);

    if ( value_question_third_2023 === dataAcademicThirdTerm.length ) {
      const value_2023 = await get(academic_third_term_value_2023);
      let real_value = JSON.parse(value_2023);
      (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademic( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademic(0.00);
      (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
      setDragIndexValueAcademic( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
      setDragIndexValueAcademic( 0.00 );
      setGradeAcademic( calculateAcademicGeneralStatus(real_value) );
    } 
    else if ( value_question_second_2023 === dataAcademicSecondTerm.length ) {
      const value_2023 = await get(academic_second_term_value_2023);
      let real_value = JSON.parse(value_2023);
      (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademic( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademic(0.00);
      (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
      setDragIndexValueAcademic( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
      setDragIndexValueAcademic( 0.00 );
      setGradeAcademic( calculateAcademicGeneralStatus(real_value) );
      
    }     
    else if ( value_question_first_2023 === dataAcademicFirstTerm.length ) {
      const value_2023 = await get(academic_first_term_value_2023);
      let real_value = JSON.parse(value_2023);
      (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademic( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademic(0.00);
      (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
      setDragIndexValueAcademic( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
      setDragIndexValueAcademic( 0.00 );
      setGradeAcademic( calculateAcademicGeneralStatus(real_value) );
    }
    else if ( value_question_third_2022 === dataAcademicThirdTerm.length ){
      const value_2022 = await get(academic_third_term_value_2022);
      let real_value = JSON.parse(value_2022);
      (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademic( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademic(0.00);
      (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
      setDragIndexValueAcademic( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
      setDragIndexValueAcademic( 0.00 );
      setGradeAcademic( calculateAcademicGeneralStatus(real_value) );
    }  
    else if ( value_question_second_2022 === dataAcademicSecondTerm.length ){
      const value_2022 = await get(academic_second_term_value_2022);
      let real_value = JSON.parse(value_2022);
      (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademic( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademic(0.00);
      (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
      setDragIndexValueAcademic( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
      setDragIndexValueAcademic( 0.00 );
      setGradeAcademic( calculateAcademicGeneralStatus(real_value) );
    }  
    else if ( value_question_first_2022 === dataAcademicFirstTerm.length ){
      const value_2022 = await get(academic_first_term_value_2022);
      let real_value = JSON.parse(value_2022);
      (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademic( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademic(0.00);
      (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
      setDragIndexValueAcademic( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
      setDragIndexValueAcademic( 0.00 );
      setGradeAcademic( calculateAcademicGeneralStatus(real_value) );
    }    
  }
  //**Static Values End*/


  //**Core Processes Start */
  const currentQuestionCp = dataCoreProcesses[currentQuestionIndexCp]; 

  const handleNextCp = async () => {
    if (selectedYear === '2022'){
      const updatedData = [...dataCoreProcesses];
      updatedData[currentQuestionIndexCp].filled = true;
      updatedData[currentQuestionIndexCp].value  = selectedValueCp;
      await set(standards_coreprocesses_value_2022, JSON.stringify(updatedData) );      
      setCoreProcessesData(updatedData);

      if (currentQuestionIndexCp < dataCoreProcesses.length - 1) {
        setCurrentQuestionIndexCp(currentQuestionIndexCp + 1);
        await set(standards_coreprocesses_questions_2022, (currentQuestionIndexCp + 1) );
        setSelectedValueCp(null);
      }

      if (progressQuestionIndexCp === 100){      
        await set(standards_coreprocesses_questions_2022, dataCoreProcesses.length );
        setCurrentQuestionIndexCp( dataCoreProcesses.length );
      }
    }

    else if (selectedYear === '2023'){
      
      const updatedData = [...dataCoreProcesses];
      updatedData[currentQuestionIndexCp].filled = true;
      updatedData[currentQuestionIndexCp].value  = selectedValueCp;
      await set(standards_coreprocesses_value_2023, JSON.stringify(updatedData) );      
      setCoreProcessesData(updatedData);

      if (currentQuestionIndexCp < dataCoreProcesses.length - 1) {
        setCurrentQuestionIndexCp(currentQuestionIndexCp + 1);
        await set(standards_coreprocesses_questions_2023, (currentQuestionIndexCp + 1) );
        setSelectedValueCp(null);
      }

      if (progressQuestionIndexCp === 100){      
        await set(standards_coreprocesses_questions_2023, dataCoreProcesses.length );
        setCurrentQuestionIndexCp( dataCoreProcesses.length );
      }
    }
    setTotalValueCp(sumValues(dataCoreProcesses));
  }; 
 
  useEffect(() => {
    let value = ((currentQuestionIndexCp + 1)/dataCoreProcesses.length) * 100;
    setProgressQuestionIndexCp(parseInt(value));
  }, [currentQuestionIndexCp]);
  //** Core Processes End */

   //**Instructor resource Start */
   const currentQuestionIns = dataInstructorResource[currentQuestionIndexIns]; 

   const handleNextIns = async () => { 
     if (selectedYear === '2022'){
       const updatedData = [...dataInstructorResource];
       updatedData[currentQuestionIndexIns].filled = true;
       updatedData[currentQuestionIndexIns].value  = selectedValueIns;
       await set(standards_instructor_value_2022, JSON.stringify(updatedData) );      
       setInstructorResourceData(updatedData);
 
       if (currentQuestionIndexIns < dataInstructorResource.length - 1) {
         setCurrentQuestionIndexIns(currentQuestionIndexIns + 1);
         await set(standards_instructor_questions_2022, (currentQuestionIndexIns + 1) );
         setSelectedValueIns(null);
       }
 
       if (progressQuestionIndexIns === 100){      
         await set(standards_instructor_questions_2022, dataInstructorResource.length );
         setCurrentQuestionIndexIns( dataInstructorResource.length );
       }
     }
 
     else if (selectedYear === '2023'){
       
       const updatedData = [...dataInstructorResource];
       updatedData[currentQuestionIndexIns].filled = true;
       updatedData[currentQuestionIndexIns].value  = selectedValueIns;
       await set(standards_instructor_value_2023, JSON.stringify(updatedData) );      
       setInstructorResourceData(updatedData);
 
       if (currentQuestionIndexIns < dataInstructorResource.length - 1) {
         setCurrentQuestionIndexIns(currentQuestionIndexIns + 1);
         await set(standards_instructor_questions_2023, (currentQuestionIndexIns + 1) );
         setSelectedValueIns(null);
       }
 
       if (progressQuestionIndexIns === 100){      
         await set(standards_instructor_questions_2023, dataInstructorResource.length );
         setCurrentQuestionIndexIns( dataInstructorResource.length );
       }
     }
     setTotalValueIns(sumValues(dataInstructorResource));
   };
  
   useEffect(() => {
     let value = ((currentQuestionIndexIns + 1)/dataInstructorResource.length) * 100;
     setProgressQuestionIndexIns(parseInt(value));
   }, [currentQuestionIndexIns]);
   //** Instructor resource End */

   //**Learning Environment Start */
   const currentQuestionLearn = dataLearningEnv[currentQuestionIndexLearn]; 

   const handleNextLearn = async () => {
 
     if (selectedYear === '2022'){
       const updatedData = [...dataLearningEnv];
       updatedData[currentQuestionIndexLearn].filled = true;
       updatedData[currentQuestionIndexLearn].value  = selectedValueLearn;
       await set(standards_learning_value_2022, JSON.stringify(updatedData) );      
       setLearningEnvData(updatedData);
 
       if (currentQuestionIndexLearn < dataLearningEnv.length - 1) {
         setCurrentQuestionIndexLearn(currentQuestionIndexLearn + 1);
         await set(standards_learning_questions_2022, (currentQuestionIndexLearn + 1) );
         setSelectedValueLearn(null);
       }
 
       if (progressQuestionIndexLearn === 100){      
         await set(standards_learning_questions_2022, dataLearningEnv.length );
         setCurrentQuestionIndexLearn( dataLearningEnv.length );
       }
     }
 
     else if (selectedYear === '2023'){
       
       const updatedData = [...dataLearningEnv];
       updatedData[currentQuestionIndexLearn].filled = true;
       updatedData[currentQuestionIndexLearn].value  = selectedValueLearn;
       await set(standards_learning_value_2023, JSON.stringify(updatedData) );      
       setLearningEnvData(updatedData);
 
       if (currentQuestionIndexLearn < dataLearningEnv.length - 1) {
         setCurrentQuestionIndexLearn(currentQuestionIndexLearn + 1);
         await set(standards_learning_questions_2023, (currentQuestionIndexLearn + 1) );
         setSelectedValueLearn(null);
       }
 
       if (progressQuestionIndexLearn === 100){      
         await set(standards_learning_questions_2023, dataLearningEnv.length );
         setCurrentQuestionIndexLearn( dataLearningEnv.length );
       }
     }
     setTotalValueLearn(sumValues(dataLearningEnv));
   };
  
   useEffect(() => {
     let value = ((currentQuestionIndexLearn + 1)/dataLearningEnv.length) * 100;
     setProgressQuestionIndexLearn(parseInt(value));
   }, [currentQuestionIndexLearn]);
   //** Learning Environment End */

   //**Total Student Dev Start */
   const currentQuestionTotal = dataTotalStudent[currentQuestionIndexTotal]; 

   const handleNextTotal = async () => { 
     if (selectedYear === '2022'){
       const updatedData = [...dataTotalStudent];
       updatedData[currentQuestionIndexTotal].filled = true;
       updatedData[currentQuestionIndexTotal].value  = selectedValueTotal;
       await set(standards_total_value_2022, JSON.stringify(updatedData) );      
       setTotalStudentData(updatedData);
 
       if (currentQuestionIndexTotal < dataTotalStudent.length - 1) {
         setCurrentQuestionIndexTotal(currentQuestionIndexTotal + 1);
         await set(standards_total_questions_2022, (currentQuestionIndexTotal + 1) );
         setSelectedValueTotal(null);
       }
 
       if (progressQuestionIndexTotal === 100){      
         await set(standards_total_questions_2022, dataTotalStudent.length );
         setCurrentQuestionIndexTotal( dataTotalStudent.length );
       }
     }
 
     else if (selectedYear === '2023'){       
       const updatedData = [...dataTotalStudent];
       updatedData[currentQuestionIndexTotal].filled = true;
       updatedData[currentQuestionIndexTotal].value  = selectedValueTotal;
       await set(standards_total_value_2023, JSON.stringify(updatedData) );      
       setTotalStudentData(updatedData);
 
       if (currentQuestionIndexTotal < dataTotalStudent.length - 1) {
         setCurrentQuestionIndexTotal(currentQuestionIndexTotal + 1);
         await set(standards_total_questions_2023, (currentQuestionIndexTotal + 1) );
         setSelectedValueTotal(null);
       }
 
       if (progressQuestionIndexTotal === 100){      
         await set(standards_total_questions_2023, dataTotalStudent.length );
         setCurrentQuestionIndexTotal( dataTotalStudent.length );
       }
     }
     setTotalValueTotal(sumValues(dataTotalStudent));
   };
  
   useEffect(() => {
     let value = ((currentQuestionIndexTotal + 1)/dataTotalStudent.length) * 100;
     setProgressQuestionIndexTotal(parseInt(value));
   }, [currentQuestionIndexTotal]);
   //** Total Student Dev  End */

   //**Sustainability Start */
   const currentQuestionSus = dataSustainability[currentQuestionIndexSus]; 

   const handleNextSus = async () => { 
     if (selectedYear === '2022'){
       const updatedData = [...dataSustainability];
       updatedData[currentQuestionIndexSus].filled = true;
       updatedData[currentQuestionIndexSus].value  = selectedValueSus;
       await set(standards_sustainability_value_2022, JSON.stringify(updatedData) );      
       setSustainabilityData(updatedData);
 
       if (currentQuestionIndexSus < dataSustainability.length - 1) {
         setCurrentQuestionIndexSus(currentQuestionIndexSus + 1);
         await set(standards_sustainability_questions_2022, (currentQuestionIndexSus + 1) );
         setSelectedValueSus(null);
       }
 
       if (progressQuestionIndexSus === 100){      
         await set(standards_sustainability_questions_2022, dataSustainability.length );
         setCurrentQuestionIndexSus( dataSustainability.length );
       }
     }
 
     else if (selectedYear === '2023'){       
       const updatedData = [...dataSustainability];
       updatedData[currentQuestionIndexSus].filled = true;
       updatedData[currentQuestionIndexSus].value  = selectedValueSus;
       await set(standards_sustainability_value_2023, JSON.stringify(updatedData) );      
       setSustainabilityData(updatedData);
 
       if (currentQuestionIndexSus < dataSustainability.length - 1) {
         setCurrentQuestionIndexSus(currentQuestionIndexSus + 1);
         await set(standards_sustainability_questions_2023, (currentQuestionIndexSus + 1) );
         setSelectedValueSus(null);
       }
 
       if (progressQuestionIndexSus === 100){      
         await set(standards_sustainability_questions_2023, dataSustainability.length );
         setCurrentQuestionIndexSus( dataSustainability.length );
       }
     }
     setTotalValueSus(sumValues(dataSustainability));
   };
  
   useEffect(() => {
     let value = ((currentQuestionIndexSus + 1)/dataSustainability.length) * 100;
     setProgressQuestionIndexSus(parseInt(value));
   }, [currentQuestionIndexSus]);
   //** Sustainability End */

   //**Academic Start */
   const currentQuestionAca = dataAcademic[currentQuestionIndexAca]; 

   const handleNextAca = async () => { 
     if (selectedYear === '2022'){
       const updatedData = [...dataAcademic];
       updatedData[currentQuestionIndexAca].filled = true;
       updatedData[currentQuestionIndexAca].value  = selectedValueAca;
       await set(standards_academic_value_2022, JSON.stringify(updatedData) );      
       setAcademicData(updatedData);
 
       if (currentQuestionIndexAca < dataAcademic.length - 1) {
         setCurrentQuestionIndexAca(currentQuestionIndexAca + 1);
         await set(standards_academic_questions_2022, (currentQuestionIndexAca + 1) );
         setSelectedValueAca(null);
       }
 
       if (progressQuestionIndexAca === 100){      
         await set(standards_academic_questions_2022, dataAcademic.length );
         setCurrentQuestionIndexAca( dataAcademic.length );
       }
     }
 
     else if (selectedYear === '2023'){       
       const updatedData = [...dataAcademic];
       updatedData[currentQuestionIndexAca].filled = true;
       updatedData[currentQuestionIndexAca].value  = selectedValueAca;
       await set(standards_academic_value_2023, JSON.stringify(updatedData) );      
       setAcademicData(updatedData);
 
       if (currentQuestionIndexAca < dataAcademic.length - 1) {
         setCurrentQuestionIndexAca(currentQuestionIndexAca + 1);
         await set(standards_academic_questions_2023, (currentQuestionIndexAca + 1) );
         setSelectedValueAca(null);
       }
 
       if (progressQuestionIndexAca === 100){      
         await set(standards_academic_questions_2023, dataAcademic.length );
         setCurrentQuestionIndexAca( dataAcademic.length );
       }
     }
     setTotalValueAca(sumValues(dataAcademic));
   };
  
   useEffect(() => {
     let value = ((currentQuestionIndexAca + 1)/dataAcademic.length) * 100;
     setProgressQuestionIndexAca(parseInt(value));
   }, [currentQuestionIndexAca]);
   //** Academic End */

   //**SSHE Start */
   const currentQuestionSshe = dataSshe[currentQuestionIndexSshe]; 

   const handleNextSshe = async () => { 
     if (selectedYear === '2022'){
       const updatedData = [...dataSshe];
       updatedData[currentQuestionIndexSshe].filled = true;
       updatedData[currentQuestionIndexSshe].value  = selectedValueSshe;
       await set(standards_sshe_value_2022, JSON.stringify(updatedData) );      
       setSsheData(updatedData);
 
       if (currentQuestionIndexSshe < dataSshe.length - 1) {
         setCurrentQuestionIndexSshe(currentQuestionIndexSshe + 1);
         await set(standards_sshe_questions_2022, (currentQuestionIndexSshe + 1) );
         setSelectedValueSshe(null);
       }
 
       if (progressQuestionIndexSshe === 100){      
         await set(standards_sshe_questions_2022, dataSshe.length );
         setCurrentQuestionIndexSshe( dataSshe.length );
       }
     }
 
     else if (selectedYear === '2023'){       
       const updatedData = [...dataSshe];
       updatedData[currentQuestionIndexSshe].filled = true;
       updatedData[currentQuestionIndexSshe].value  = selectedValueSshe;
       await set(standards_sshe_value_2023, JSON.stringify(updatedData) );      
       setSsheData(updatedData);
 
       if (currentQuestionIndexSshe < dataSshe.length - 1) {
         setCurrentQuestionIndexSshe(currentQuestionIndexSshe + 1);
         await set(standards_sshe_questions_2023, (currentQuestionIndexSshe + 1) );
         setSelectedValueSshe(null);
       }
 
       if (progressQuestionIndexSshe === 100){      
         await set(standards_sshe_questions_2023, dataSshe.length );
         setCurrentQuestionIndexSshe( dataSshe.length );
       }
     }
     setTotalValueSshe(sumValues(dataSshe));
   };
  
   useEffect(() => {
     let value = ((currentQuestionIndexSshe + 1)/dataSshe.length) * 100;
     setProgressQuestionIndexSshe(parseInt(value));
   }, [currentQuestionIndexSshe]);
   //** SSHE End */

   //**Academic Start
   const currentQuestionAcademicFirstTerm  = dataAcademicFirstTerm[currentQuestionIndexAcademicFirstTerm]; 
   const currentQuestionAcademicSecondTerm = dataAcademicSecondTerm[currentQuestionIndexAcademicSecondTerm];
   const currentQuestionAcademicThirdTerm  = dataAcademicThirdTerm[currentQuestionIndexAcademicThirdTerm];
   const currentQuestionAcademicExternal   = dataAcademicExternal[currentQuestionIndexAcademicExternal];

   const checkAcademicNextCaseFirstTerm = (updatedData) => {
    if (currentQuestionIndexAcademicFirstTerm === 0){
      if (Number(selectedValueAcademicFirstTerm) <= 10){
        alert("This Academic Enrollee count is too low. You must have more than 10 enrollees.");
        return false;
      }
   }
   else if (currentQuestionIndexAcademicFirstTerm === 1){
      let findIfAllowed = updatedData[0].value * academic_minimum_subjects;
      if (Number(selectedValueAcademicFirstTerm) < findIfAllowed){
        alert(`This Academic Enrollment count is too low. You must have more than ${findIfAllowed} enrollment per subject count.`);
        return false;
      }
   }
   else if (currentQuestionIndexAcademicFirstTerm === 2){  
      let findIfAllowed = updatedData[1].value;      
      if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
        alert(`This A1 count is more than the Enrollment count. You must have less than ${findIfAllowed} enrollment per subject count.`);
        return false;
      }
   }
  else if (currentQuestionIndexAcademicFirstTerm === 3){  
    let findIfAllowed = updatedData[1].value - updatedData[2].value;      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This B2 count is more than the remnant from the A1 count. You must have less than ${findIfAllowed} remnant count from A1.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicFirstTerm === 4){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value);      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This B3 count is more than the remnant from the A1 + B2 count. You must have less than ${findIfAllowed} remnant count from A1 + B2.`);
    }
  }
  else if (currentQuestionIndexAcademicFirstTerm === 5){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value);      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This C4 count is more than the remnant from the A1 + B2 + B3 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicFirstTerm === 6){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value);      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This C5 count is more than the remnant from the A1 + B2 + B3 + C4 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicFirstTerm === 7){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value);      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This C6 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicFirstTerm === 8){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value);      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This D7 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicFirstTerm === 9){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value);      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This E8 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicFirstTerm === 10){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value + updatedData[9].value);      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This F9 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8.`);
       return false;
    }
   }
   else if (currentQuestionIndexAcademicFirstTerm === 11){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value + updatedData[9].value + updatedData[10].value);      
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
       alert(`This Absent count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 + F9 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 + F9.`);
       return false;
    }
   }
   else if (currentQuestionIndexAcademicFirstTerm === 12){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
      alert("This English Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   else if (currentQuestionIndexAcademicFirstTerm === 13){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
      alert("This Mathematics Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   else if (currentQuestionIndexAcademicFirstTerm === 14){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicFirstTerm) > findIfAllowed){
      alert("This HIT Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   }

   const checkAcademicNextCaseSecondTerm = (updatedData) => {
    if (currentQuestionIndexAcademicSecondTerm === 0){
      if (Number(selectedValueAcademicSecondTerm) <= 10){
        alert("This Academic Enrollee count is too low. You must have more than 10 enrollees.");
        return false;
      }
   }
   else if (currentQuestionIndexAcademicSecondTerm === 1){
      let findIfAllowed = updatedData[0].value * academic_minimum_subjects;
      if (Number(selectedValueAcademicSecondTerm) < findIfAllowed){
        alert(`This Academic Enrollment count is too low. You must have more than ${findIfAllowed} enrollment per subject count.`);
        return false;
      }
   }
   else if (currentQuestionIndexAcademicSecondTerm === 2){  
      let findIfAllowed = updatedData[1].value;      
      if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
        alert(`This A1 count is more than the Enrollment count. You must have less than ${findIfAllowed} enrollment per subject count.`);
        return false;
      }
   }
  else if (currentQuestionIndexAcademicSecondTerm === 3){  
    let findIfAllowed = updatedData[1].value - updatedData[2].value;      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This B2 count is more than the remnant from the A1 count. You must have less than ${findIfAllowed} remnant count from A1.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicSecondTerm === 4){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value);      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This B3 count is more than the remnant from the A1 + B2 count. You must have less than ${findIfAllowed} remnant count from A1 + B2.`);
    }
  }
  else if (currentQuestionIndexAcademicSecondTerm === 5){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value);      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This C4 count is more than the remnant from the A1 + B2 + B3 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicSecondTerm === 6){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value);      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This C5 count is more than the remnant from the A1 + B2 + B3 + C4 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicSecondTerm === 7){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value);      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This C6 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicSecondTerm === 8){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value);      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This D7 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicSecondTerm === 9){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value);      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This E8 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicSecondTerm === 10){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value + updatedData[9].value);      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This F9 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8.`);
       return false;
    }
   }
   else if (currentQuestionIndexAcademicSecondTerm === 11){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value + updatedData[9].value + updatedData[10].value);      
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
       alert(`This Absent count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 + F9 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 + F9.`);
       return false;
    }
   }
   else if (currentQuestionIndexAcademicSecondTerm === 12){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
      alert("This English Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   else if (currentQuestionIndexAcademicSecondTerm === 13){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
      alert("This Mathematics Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   else if (currentQuestionIndexAcademicSecondTerm === 14){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicSecondTerm) > findIfAllowed){
      alert("This HIT Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   }

   const checkAcademicNextCaseThirdTerm = (updatedData) => {
    if (currentQuestionIndexAcademicThirdTerm === 0){
      if (Number(selectedValueAcademicThirdTerm) <= 10){
        alert("This Academic Enrollee count is too low. You must have more than 10 enrollees.");
        return false;
      }
   }
   else if (currentQuestionIndexAcademicThirdTerm === 1){
      let findIfAllowed = updatedData[0].value * academic_minimum_subjects;
      if (Number(selectedValueAcademicThirdTerm) < findIfAllowed){
        alert(`This Academic Enrollment count is too low. You must have more than ${findIfAllowed} enrollment per subject count.`);
        return false;
      }
   }
   else if (currentQuestionIndexAcademicThirdTerm === 2){  
      let findIfAllowed = updatedData[1].value;      
      if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
        alert(`This A1 count is more than the Enrollment count. You must have less than ${findIfAllowed} enrollment per subject count.`);
        return false;
      }
   }
  else if (currentQuestionIndexAcademicThirdTerm === 3){  
    let findIfAllowed = updatedData[1].value - updatedData[2].value;      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This B2 count is more than the remnant from the A1 count. You must have less than ${findIfAllowed} remnant count from A1.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicThirdTerm === 4){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value);      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This B3 count is more than the remnant from the A1 + B2 count. You must have less than ${findIfAllowed} remnant count from A1 + B2.`);
    }
  }
  else if (currentQuestionIndexAcademicThirdTerm === 5){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value);      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This C4 count is more than the remnant from the A1 + B2 + B3 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicThirdTerm === 6){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value);      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This C5 count is more than the remnant from the A1 + B2 + B3 + C4 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicThirdTerm === 7){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value);      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This C6 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicThirdTerm === 8){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value);      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This D7 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicThirdTerm === 9){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value);      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This E8 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicThirdTerm === 10){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value + updatedData[9].value);      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This F9 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8.`);
       return false;
    }
   }
   else if (currentQuestionIndexAcademicThirdTerm === 11){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value + updatedData[9].value + updatedData[10].value);      
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
       alert(`This Absent count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 + F9 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 + F9.`);
       return false;
    }
   }
   else if (currentQuestionIndexAcademicThirdTerm === 12){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
      alert("This English Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   else if (currentQuestionIndexAcademicThirdTerm === 13){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
      alert("This Mathematics Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   else if (currentQuestionIndexAcademicThirdTerm === 14){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicThirdTerm) > findIfAllowed){
      alert("This HIT Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   }

   const checkAcademicNextCaseExternal = (updatedData) => {
    if (currentQuestionIndexAcademicExternal === 0){
      if (Number(selectedValueAcademicExternal) <= 10){
        alert("This Academic Enrollee count is too low. You must have more than 10 enrollees.");
        return false;
      }
   }
   else if (currentQuestionIndexAcademicExternal === 1){
      let findIfAllowed = updatedData[0].value * academic_minimum_subjects;
      if (Number(selectedValueAcademicExternal) < findIfAllowed){
        alert(`This Academic Enrollment count is too low. You must have more than ${findIfAllowed} enrollment per subject count.`);
        return false;
      }
   }
   else if (currentQuestionIndexAcademicExternal === 2){  
      let findIfAllowed = updatedData[1].value;      
      if (Number(selectedValueAcademicExternal) > findIfAllowed){
        alert(`This A1 count is more than the Enrollment count. You must have less than ${findIfAllowed} enrollment per subject count.`);
        return false;
      }
   }
  else if (currentQuestionIndexAcademicExternal === 3){  
    let findIfAllowed = updatedData[1].value - updatedData[2].value;      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This B2 count is more than the remnant from the A1 count. You must have less than ${findIfAllowed} remnant count from A1.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicExternal === 4){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value);      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This B3 count is more than the remnant from the A1 + B2 count. You must have less than ${findIfAllowed} remnant count from A1 + B2.`);
    }
  }
  else if (currentQuestionIndexAcademicExternal === 5){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value);      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This C4 count is more than the remnant from the A1 + B2 + B3 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicExternal === 6){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value);      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This C5 count is more than the remnant from the A1 + B2 + B3 + C4 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicExternal === 7){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value);      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This C6 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicExternal === 8){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value);      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This D7 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicExternal === 9){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value);      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This E8 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7.`);
       return false;
    }
  }
  else if (currentQuestionIndexAcademicExternal === 10){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value + updatedData[9].value);      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This F9 count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8.`);
       return false;
    }
   }
   else if (currentQuestionIndexAcademicExternal === 11){  
    let findIfAllowed = updatedData[1].value - (updatedData[2].value + updatedData[3].value + updatedData[4].value + updatedData[5].value + updatedData[6].value + updatedData[7].value + updatedData[8].value + updatedData[9].value + updatedData[10].value);      
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
       alert(`This Absent count is more than the remnant from the A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 + F9 count. You must have less than ${findIfAllowed} remnant count from A1 + B2 + B3 + C4 + C5 + C6 + D7 + E8 + F9.`);
       return false;
    }
   }
   else if (currentQuestionIndexAcademicExternal === 12){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
      alert("This English Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   else if (currentQuestionIndexAcademicExternal === 13){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
      alert("This Mathematics Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   else if (currentQuestionIndexAcademicExternal === 14){
    let findIfAllowed = updatedData[0].value
    if (Number(selectedValueAcademicExternal) > findIfAllowed){
      alert("This HIT Credit count should not be more than the Enrollee Count");
      return false;
    }
   }
   }

   const calculateAcademicGeneralStatus = (updatedData) => {
      const enrollments =  updatedData[1].value;
      const a1_count    =  updatedData[2].value;
      let gradeA = parseFloat( Number(a1_count/enrollments).toFixed(2) );

      const b2_count    =  updatedData[3].value;
      const b3_count    =  updatedData[4].value;
      let gradeB = parseFloat( Number( (b2_count + b3_count) /enrollments).toFixed(2) );

      const c4_count    =  updatedData[5].value;
      const c5_count    =  updatedData[6].value;
      const c6_count    =  updatedData[7].value;
      let gradeC = parseFloat( Number( (c4_count + c5_count + c6_count) /enrollments).toFixed(2) );

      const d7_count    =  updatedData[8].value;
      const e8_count    =  updatedData[9].value;
      const f9_count    =  updatedData[10].value;
      let gradeD = parseFloat( Number( (d7_count + e8_count + f9_count) /enrollments).toFixed(2) );

      if (gradeA > gradeB){
        return "Grade A";
      }
      else if (gradeB > gradeC){
        return "Grade B";
      }
      else if (gradeC > gradeD){
        return "Grade C";
      }
      else{
        return "Ungraded";
      }
     
   }

   const handleNextAcademicFirstTerm = async () => { 
     if (selectedYearAcademic === '2022'){
       const updatedData = [...dataAcademicFirstTerm];
       let check = checkAcademicNextCaseFirstTerm(updatedData);
       if (check === false){
        return;
       }

       updatedData[currentQuestionIndexAcademicFirstTerm].filled = true;
       updatedData[currentQuestionIndexAcademicFirstTerm].value  = selectedValueAcademicFirstTerm;
       await set(academic_first_term_value_2022, JSON.stringify(updatedData) );      
       setAcademicFirstTermData(updatedData);
 
       if (currentQuestionIndexAcademicFirstTerm < dataAcademicFirstTerm.length - 1) {
         setCurrentQuestionIndexAcademicFirstTerm(currentQuestionIndexAcademicFirstTerm + 1);
         await set(academic_first_term_questions_2022, (currentQuestionIndexAcademicFirstTerm + 1) );
         setSelectedValueAcademicFirstTerm('');
       }
 
       if (progressQuestionIndexAcademicFirstTerm === 100){      
         await set(academic_first_term_questions_2022, dataAcademicFirstTerm.length );
         setCurrentQuestionIndexAcademicFirstTerm( dataAcademicFirstTerm.length );
         setSelectedValueAcademicFirstTerm('');

         setGradeAcademicFirstTerm( calculateAcademicGeneralStatus( updatedData ) );
         let real_value = updatedData;
         (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicFirstTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicFirstTerm(0.00);
         (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
         setDragIndexValueAcademicFirstTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
         setDragIndexValueAcademicFirstTerm( 0.00 );
       }
     }
 
     else if (selectedYearAcademic === '2023'){       
        const updatedData = [...dataAcademicFirstTerm];
        let check = checkAcademicNextCaseFirstTerm(updatedData);
        if (check === false){
          return;
        }
        updatedData[currentQuestionIndexAcademicFirstTerm].filled = true;
        updatedData[currentQuestionIndexAcademicFirstTerm].value  = selectedValueAcademicFirstTerm;
        await set(academic_first_term_value_2023, JSON.stringify(updatedData) );      
        setAcademicFirstTermData(updatedData);

        if (currentQuestionIndexAcademicFirstTerm < dataAcademicFirstTerm.length - 1) {
          setCurrentQuestionIndexAcademicFirstTerm(currentQuestionIndexAcademicFirstTerm + 1);
          await set(academic_first_term_questions_2023, (currentQuestionIndexAcademicFirstTerm + 1) );
          setSelectedValueAcademicFirstTerm('');
        }

        if (progressQuestionIndexAcademicFirstTerm === 100){      
          await set(academic_first_term_questions_2023, dataAcademicFirstTerm.length );
          setCurrentQuestionIndexAcademicFirstTerm( dataAcademicFirstTerm.length );
          setSelectedValueAcademicFirstTerm('');
          
          setGradeAcademicFirstTerm( calculateAcademicGeneralStatus( updatedData ) );
          let real_value = updatedData;
          (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicFirstTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicFirstTerm(0.00);
          (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
          setDragIndexValueAcademicFirstTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
          setDragIndexValueAcademicFirstTerm( 0.00 );
        }
     }
     //setTotalValueSshe(sumValues(dataSshe));
   };

   const handleNextAcademicSecondTerm = async () => { 
    if (selectedYearAcademic === '2022'){
      const updatedData = [...dataAcademicSecondTerm];
      let check = checkAcademicNextCaseSecondTerm(updatedData);
      if (check === false){
        return;
      }
      updatedData[currentQuestionIndexAcademicSecondTerm].filled = true;
      updatedData[currentQuestionIndexAcademicSecondTerm].value  = selectedValueAcademicSecondTerm;
      await set(academic_second_term_value_2022, JSON.stringify(updatedData) );      
      setAcademicSecondTermData(updatedData);

      if (currentQuestionIndexAcademicSecondTerm < dataAcademicSecondTerm.length - 1) {
        setCurrentQuestionIndexAcademicSecondTerm(currentQuestionIndexAcademicSecondTerm + 1);
        await set(academic_second_term_questions_2022, (currentQuestionIndexAcademicSecondTerm + 1) );
        setSelectedValueAcademicSecondTerm('');
      }

      if (progressQuestionIndexAcademicSecondTerm === 100){      
        await set(academic_second_term_questions_2022, dataAcademicSecondTerm.length );
        setCurrentQuestionIndexAcademicSecondTerm( dataAcademicSecondTerm.length );
        setSelectedValueAcademicSecondTerm('');

        setGradeAcademicSecondTerm( calculateAcademicGeneralStatus( updatedData ) );
        let real_value = updatedData;
        (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicSecondTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicSecondTerm(0.00);
        (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
        setDragIndexValueAcademicSecondTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
        setDragIndexValueAcademicSecondTerm( 0.00 );
      }
    }

    else if (selectedYearAcademic === '2023'){       
       const updatedData = [...dataAcademicSecondTerm];
       let check = checkAcademicNextCaseSecondTerm(updatedData);
       if (check === false){
        return;
       }
       updatedData[currentQuestionIndexAcademicSecondTerm].filled = true;
       updatedData[currentQuestionIndexAcademicSecondTerm].value  = selectedValueAcademicSecondTerm;
       await set(academic_second_term_value_2023, JSON.stringify(updatedData) );      
       setAcademicSecondTermData(updatedData);

       if (currentQuestionIndexAcademicSecondTerm < dataAcademicSecondTerm.length - 1) {
         setCurrentQuestionIndexAcademicSecondTerm(currentQuestionIndexAcademicSecondTerm + 1);
         await set(academic_second_term_questions_2023, (currentQuestionIndexAcademicSecondTerm + 1) );
         setSelectedValueAcademicSecondTerm('');
       }

       if (progressQuestionIndexAcademicSecondTerm === 100){      
         await set(academic_second_term_questions_2023, dataAcademicSecondTerm.length );
         setCurrentQuestionIndexAcademicSecondTerm( dataAcademicSecondTerm.length );
         setSelectedValueAcademicSecondTerm('');

         setGradeAcademicSecondTerm( calculateAcademicGeneralStatus( updatedData ) );
         let real_value = updatedData;
         (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicSecondTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicSecondTerm(0.00);
         (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
         setDragIndexValueAcademicSecondTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
         setDragIndexValueAcademicSecondTerm( 0.00 );
       }
    }
   };

   const handleNextAcademicThirdTerm = async () => { 
      if (selectedYearAcademic === '2022'){
        const updatedData = [...dataAcademicThirdTerm];
        let check = checkAcademicNextCaseThirdTerm(updatedData);
        if (check === false){
          return;
        }
        updatedData[currentQuestionIndexAcademicThirdTerm].filled = true;
        updatedData[currentQuestionIndexAcademicThirdTerm].value  = selectedValueAcademicThirdTerm;
        await set(academic_third_term_value_2022, JSON.stringify(updatedData) );      
        setAcademicThirdTermData(updatedData);

        if (currentQuestionIndexAcademicThirdTerm < dataAcademicThirdTerm.length - 1) {
          setCurrentQuestionIndexAcademicThirdTerm(currentQuestionIndexAcademicThirdTerm + 1);
          await set(academic_third_term_questions_2022, (currentQuestionIndexAcademicThirdTerm + 1) );
          setSelectedValueAcademicThirdTerm('');
        }

        if (progressQuestionIndexAcademicThirdTerm === 100){      
          await set(academic_third_term_questions_2022, dataAcademicThirdTerm.length );
          setCurrentQuestionIndexAcademicThirdTerm( dataAcademicThirdTerm.length );
          setSelectedValueAcademicThirdTerm('');

          setGradeAcademicThirdTerm( calculateAcademicGeneralStatus( updatedData ) );
          let real_value = updatedData;
          (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicThirdTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicThirdTerm(0.00);
          (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
          setDragIndexValueAcademicThirdTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
          setDragIndexValueAcademicThirdTerm( 0.00 );
        }
      }

      else if (selectedYearAcademic === '2023'){       
        const updatedData = [...dataAcademicThirdTerm];
        let check = checkAcademicNextCaseThirdTerm(updatedData);
        if (check === false){
          return;
        }
        updatedData[currentQuestionIndexAcademicThirdTerm].filled = true;
        updatedData[currentQuestionIndexAcademicThirdTerm].value  = selectedValueAcademicThirdTerm;
        await set(academic_third_term_value_2023, JSON.stringify(updatedData) );      
        setAcademicThirdTermData(updatedData);

        if (currentQuestionIndexAcademicThirdTerm < dataAcademicThirdTerm.length - 1) {
          setCurrentQuestionIndexAcademicThirdTerm(currentQuestionIndexAcademicThirdTerm + 1);
          await set(academic_third_term_questions_2023, (currentQuestionIndexAcademicThirdTerm + 1) );
          setSelectedValueAcademicThirdTerm('');
        }

        if (progressQuestionIndexAcademicThirdTerm === 100){      
          await set(academic_third_term_questions_2023, dataAcademicThirdTerm.length );
          setCurrentQuestionIndexAcademicThirdTerm( dataAcademicThirdTerm.length );
          setSelectedValueAcademicThirdTerm('');

          setGradeAcademicThirdTerm( calculateAcademicGeneralStatus( updatedData ) );
          let real_value = updatedData;
          (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicThirdTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicThirdTerm(0.00);
          (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
          setDragIndexValueAcademicThirdTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
          setDragIndexValueAcademicThirdTerm( 0.00 );
        }
      }
      //setTotalValueSshe(sumValues(dataSshe));
   };

   const handleNextAcademicExternal = async () => { 
    if (selectedYearAcademic === '2022'){
      const updatedData = [...dataAcademicExternal];
      let check = checkAcademicNextCaseExternal(updatedData);
      if (check === false){
        return;
      }
      updatedData[currentQuestionIndexAcademicExternal].filled = true;
      updatedData[currentQuestionIndexAcademicExternal].value  = selectedValueAcademicExternal;
      await set(academic_external_value_2022, JSON.stringify(updatedData) );      
      setAcademicExternalData(updatedData);

      if (currentQuestionIndexAcademicExternal < dataAcademicExternal.length - 1) {
        setCurrentQuestionIndexAcademicExternal(currentQuestionIndexAcademicExternal + 1);
        await set(academic_external_questions_2022, (currentQuestionIndexAcademicExternal + 1) );
        setSelectedValueAcademicExternal('');
      }

      if (progressQuestionIndexAcademicExternal === 100){      
        await set(academic_external_questions_2022, dataAcademicExternal.length );
        setCurrentQuestionIndexAcademicExternal( dataAcademicExternal.length );
        setSelectedValueAcademicExternal('');

        setGradeAcademicExternal( calculateAcademicGeneralStatus( updatedData ) );
        let real_value = updatedData;
        (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicExternal( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicExternal(0.00);
        (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
        setDragIndexValueAcademicExternal( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
        setDragIndexValueAcademicExternal( 0.00 );
      }
    }

    else if (selectedYearAcademic === '2023'){       
      const updatedData = [...dataAcademicExternal];
      let check = checkAcademicNextCaseExternal(updatedData);
      if (check === false){
        return;
      }
      updatedData[currentQuestionIndexAcademicExternal].filled = true;
      updatedData[currentQuestionIndexAcademicExternal].value  = selectedValueAcademicExternal;
      await set(academic_external_value_2023, JSON.stringify(updatedData) );      
      setAcademicExternalData(updatedData);

      if (currentQuestionIndexAcademicExternal < dataAcademicExternal.length - 1) {
        setCurrentQuestionIndexAcademicExternal(currentQuestionIndexAcademicExternal + 1);
        await set(academic_external_questions_2023, (currentQuestionIndexAcademicExternal + 1) );
        setSelectedValueAcademicExternal('');
      }

      if (progressQuestionIndexAcademicExternal === 100){      
        await set(academic_external_questions_2023, dataAcademicExternal.length );
        setCurrentQuestionIndexAcademicExternal( dataAcademicExternal.length );
        setSelectedValueAcademicExternal('');

        setGradeAcademicExternal( calculateAcademicGeneralStatus( updatedData ) );
        let real_value = updatedData;
        (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicExternal( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicExternal(0.00);
        (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
        setDragIndexValueAcademicExternal( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
        setDragIndexValueAcademicExternal( 0.00 );
      }
    }
    //setTotalValueSshe(sumValues(dataSshe));
   };
  
   useEffect(() => {
     let value = ((currentQuestionIndexAcademicFirstTerm + 1)/dataAcademicFirstTerm.length) * 100;
     setProgressQuestionIndexAcademicFirstTerm(parseInt(value));
   }, [currentQuestionIndexAcademicFirstTerm]);

   useEffect(() => {
    let value = ((currentQuestionIndexAcademicSecondTerm + 1)/dataAcademicSecondTerm.length) * 100;
    setProgressQuestionIndexAcademicSecondTerm(parseInt(value));
  }, [currentQuestionIndexAcademicSecondTerm]);

  useEffect(() => {
    let value = ((currentQuestionIndexAcademicThirdTerm + 1)/dataAcademicThirdTerm.length) * 100;
    setProgressQuestionIndexAcademicThirdTerm(parseInt(value));
  }, [currentQuestionIndexAcademicThirdTerm]);

  useEffect(() => {
    let value = ((currentQuestionIndexAcademicExternal + 1)/dataAcademicExternal.length) * 100;
    setProgressQuestionIndexAcademicExternal(parseInt(value));
  }, [currentQuestionIndexAcademicExternal]);
   //**Academic End */

  //**General Functions */
  const parseOption = (option) => {
    const [label, value] = option.split(' = ');
    return { label, value };
  };

  const sumValues = (data) => {    
    return data.reduce((accumulator, current) => {
      const value = Number(current.value);
      if (!isNaN(value)) {
        return accumulator + value;
      }
      return accumulator;
    }, 0);
  }

  /**Select Button */
  const handleChangeNativeSelectYear = async (event) => {
    setSelectedYear(event.currentTarget.value);
    let selectedYearVal = event.currentTarget.value;
    try {
      if (selectedYearVal === "2022"){
        const value = await get(standards_coreprocesses_value_2022);        
        if (value !== undefined) {
          setCoreProcessesData( JSON.parse(value) );
          setTotalValueCp(sumValues(JSON.parse(value)));
        } else {
          const defaultValue = datacoreprocesses;
          await set(standards_coreprocesses_value_2022, JSON.stringify(defaultValue) );
          setCoreProcessesData(defaultValue);
        }

        const value_question = await get(standards_coreprocesses_questions_2022);
        if (value_question !== undefined) {
          setCurrentQuestionIndexCp( value_question );
        }
        else{
          setCurrentQuestionIndexCp( 0 );
        }

        //////////////////////////////////////////////////////
        const value2 = await get(standards_instructor_value_2022);        
        if (value2 !== undefined) {
          setInstructorResourceData( JSON.parse(value2) );
          setTotalValueIns(sumValues(JSON.parse(value2)));
        } else {
          const defaultValue = dataschoolinstructorresource;
          await set(standards_instructor_value_2022, JSON.stringify(defaultValue) );
          setInstructorResourceData(defaultValue);
        }

        const value_question2 = await get(standards_instructor_questions_2022);
        if (value_question2 !== undefined) {
          setCurrentQuestionIndexIns( value_question2 );
        }
        else{
          setCurrentQuestionIndexIns( 0 );
        }
        //////////////////////////////////////////////////////
        const value3 = await get(standards_learning_value_2022);        
        if (value3 !== undefined) {
          setLearningEnvData( JSON.parse(value3) );
          setTotalValueLearn(sumValues(JSON.parse(value3)));
        } else {
          const defaultValue = dataschoollearningenvironment;
          await set(standards_learning_value_2022, JSON.stringify(defaultValue) );
          setLearningEnvData(defaultValue);
        }

        const value_question3 = await get(standards_learning_questions_2022);
        if (value_question3 !== undefined) {
          setCurrentQuestionIndexLearn( value_question3 );
        }
        else{
          setCurrentQuestionIndexLearn( 0 );
        }
        //////////////////////////////////////////////////////

        const value4 = await get(standards_total_value_2022);        
        if (value4 !== undefined) {
          setTotalStudentData( JSON.parse(value4) );
          setTotalValueTotal(sumValues(JSON.parse(value4)));
        } else {
          const defaultValue = dataschooltotalstudentdevdata;
          await set(standards_total_value_2022, JSON.stringify(defaultValue) );
          setTotalStudentData(defaultValue);
        }
        const value_question4 = await get(standards_total_questions_2022);
        if (value_question4 !== undefined) {
          setCurrentQuestionIndexTotal( value_question4 );
        }
        else{
          setCurrentQuestionIndexTotal( 0 );
        }
        //////////////////////////////////////////////////////

        const value5 = await get(standards_sustainability_value_2022);        
        if (value5 !== undefined) {
          setSustainabilityData( JSON.parse(value5) );
          setTotalValueSus(sumValues(JSON.parse(value5)));
        } else {
          const defaultValue = dataschoolsustainabilitydata;
          await set(standards_sustainability_value_2022, JSON.stringify(defaultValue) );
          setSustainabilityData(defaultValue);
        }
        const value_question5 = await get(standards_sustainability_questions_2022);
        if (value_question5 !== undefined) {
          setCurrentQuestionIndexSus( value_question5 );
        }
        else{
          setCurrentQuestionIndexSus( 0 );
        }
        //////////////////////////////////////////////////////

        const value6 = await get(standards_academic_value_2022);        
        if (value6 !== undefined) {
          setAcademicData( JSON.parse(value6) );
          setTotalValueAca(sumValues(JSON.parse(value6)));
        } else {
          const defaultValue = dataschoolacademicperfdata;
          await set(standards_academic_value_2022, JSON.stringify(defaultValue) );
          setAcademicData(defaultValue);
        }
        const value_question6 = await get(standards_academic_questions_2022);
        if (value_question6 !== undefined) {
          setCurrentQuestionIndexAca( value_question6 );
        }
        else{
          setCurrentQuestionIndexAca( 0 );
        }
        //////////////////////////////////////////////////////

        const value7 = await get(standards_sshe_value_2022);        
        if (value7 !== undefined) {
          setSsheData( JSON.parse(value7) );
          setTotalValueSshe(sumValues(JSON.parse(value7)));
        } else {
          const defaultValue = dataschoolsshedata;
          await set(standards_sshe_value_2022, JSON.stringify(defaultValue) );
          setSsheData(defaultValue);
        }
        const value_question7 = await get(standards_sshe_questions_2022);
        if (value_question7 !== undefined) {
          setCurrentQuestionIndexSshe( value_question7 );
        }
        else{
          setCurrentQuestionIndexSshe( 0 );
        }
        //////////////////////////////////////////////////////

      }

      else if (selectedYearVal === "2023"){       
        const value = await get(standards_coreprocesses_value_2023);                
        if (value !== undefined) {
          setCoreProcessesData( JSON.parse(value) );
          setTotalValueCp(sumValues(JSON.parse(value)));
        } else {
          const defaultValue = datacoreprocesses;
          await set(standards_coreprocesses_value_2023, JSON.stringify(defaultValue) );
          setCoreProcessesData(defaultValue);
        }

        const value_question = await get(standards_coreprocesses_questions_2023);
        if (value_question !== undefined) {
          setCurrentQuestionIndexCp( value_question );
        }
        else{
          setCurrentQuestionIndexCp( 0 );
        }
        ///////////////////////////////////////////
        
        const value2 = await get(standards_instructor_value_2023);        
        if (value2 !== undefined) {
          setInstructorResourceData( JSON.parse(value2) );
          setTotalValueIns(sumValues(JSON.parse(value2)));
        } else {
          const defaultValue = dataschoolinstructorresource;
          await set(standards_instructor_value_2023, JSON.stringify(defaultValue) );
          setInstructorResourceData(defaultValue);
        }

        const value_question2 = await get(standards_instructor_questions_2023);
        if (value_question2 !== undefined) {
          setCurrentQuestionIndexIns( value_question2 );
        }
        else{
          setCurrentQuestionIndexIns( 0 );
        }
        ///////////////////////////////////////////////////

        const value3 = await get(standards_learning_value_2023);        
        if (value3 !== undefined) {
          setLearningEnvData( JSON.parse(value3) );
          setTotalValueLearn(sumValues(JSON.parse(value3)));
        } else {
          const defaultValue = dataschoollearningenvironment;
          await set(standards_learning_value_2023, JSON.stringify(defaultValue) );
          setLearningEnvData(defaultValue);
        }

        const value_question3 = await get(standards_learning_questions_2023);
        if (value_question3 !== undefined) {
          setCurrentQuestionIndexLearn( value_question3 );
        }
        else{
          setCurrentQuestionIndexLearn( 0 );
        }
        ///////////////////////////////////////////////////

        const value4 = await get(standards_total_value_2023);        
        if (value4 !== undefined) {
          setTotalStudentData( JSON.parse(value4) );
          setTotalValueTotal(sumValues(JSON.parse(value4)));
        } else {
          const defaultValue = dataschooltotalstudentdevdata;
          await set(standards_total_value_2023, JSON.stringify(defaultValue) );
          setTotalStudentData(defaultValue);
        }
        const value_question4 = await get(standards_total_questions_2023);
        if (value_question4 !== undefined) {
          setCurrentQuestionIndexTotal( value_question4 );
        }
        else{
          setCurrentQuestionIndexTotal( 0 );
        }
        //////////////////////////////////////////////////////

        const value5 = await get(standards_sustainability_value_2023);        
        if (value5 !== undefined) {
          setSustainabilityData( JSON.parse(value5) );
          setTotalValueSus(sumValues(JSON.parse(value5)));
        } else {
          const defaultValue = dataschoolsustainabilitydata;
          await set(standards_sustainability_value_2023, JSON.stringify(defaultValue) );
          setSustainabilityData(defaultValue);
        }
        const value_question5 = await get(standards_sustainability_questions_2023);
        if (value_question5 !== undefined) {
          setCurrentQuestionIndexSus( value_question5 );
        }
        else{
          setCurrentQuestionIndexSus( 0 );
        }
        //////////////////////////////////////////////////////

        const value6 = await get(standards_academic_value_2023);        
        if (value6 !== undefined) {
          setAcademicData( JSON.parse(value6) );
          setTotalValueAca(sumValues(JSON.parse(value6)));
        } else {
          const defaultValue = dataschoolacademicperfdata;
          await set(standards_academic_value_2023, JSON.stringify(defaultValue) );
          setAcademicData(defaultValue);
        }
        const value_question6 = await get(standards_academic_questions_2023);
        if (value_question6 !== undefined) {
          setCurrentQuestionIndexAca( value_question6 );
        }
        else{
          setCurrentQuestionIndexAca( 0 );
        }
        //////////////////////////////////////////////////////

        const value7 = await get(standards_sshe_value_2023);        
        if (value7 !== undefined) {
          setSsheData( JSON.parse(value7) );
          setTotalValueSshe(sumValues(JSON.parse(value7)));
        } else {
          const defaultValue = dataschoolsshedata;
          await set(standards_sshe_value_2023, JSON.stringify(defaultValue) );
          setSsheData(defaultValue);
        }
        const value_question7 = await get(standards_sshe_questions_2023);
        if (value_question7 !== undefined) {
          setCurrentQuestionIndexSshe( value_question7 );
        }
        else{
          setCurrentQuestionIndexSshe( 0 );
        }
        //////////////////////////////////////////////////////
      }

    } catch (err) {
      console.error('Error fetching value from IndexedDB:', err);
    }
  };

  const handleChangeNativeSelectYearAcademic = async (event) => {
    setSelectedYearAcademic(event.currentTarget.value);
    let selectedYearVal = event.currentTarget.value;
    try {
      if (selectedYearVal === "2022"){
          const value = await get(academic_first_term_value_2022);        
          if (value !== undefined) {
            setAcademicFirstTermData( JSON.parse(value) );
            setGradeAcademicFirstTerm( calculateAcademicGeneralStatus(JSON.parse(value)) );
            let real_value = JSON.parse(value);
            (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicFirstTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicFirstTerm(0.00);
            (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
            setDragIndexValueAcademicFirstTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
            setDragIndexValueAcademicFirstTerm( 0.00 );
          } else {
            const defaultValue = dataschoolacademicfirsttermdata;
            await set(academic_first_term_value_2022, JSON.stringify(defaultValue) );
            setAcademicFirstTermData(defaultValue);
          }
          const value_question = await get(academic_first_term_questions_2022);
          if (value_question !== undefined) {
            setCurrentQuestionIndexAcademicFirstTerm( value_question );
          }
          else{
            setCurrentQuestionIndexAcademicFirstTerm( 0 );
          }
      }
      else if (selectedYearVal === "2023"){
        const value = await get(academic_first_term_value_2023);        
        if (value !== undefined) {
          setAcademicFirstTermData( JSON.parse(value) );
          setGradeAcademicFirstTerm( calculateAcademicGeneralStatus(JSON.parse(value)) );
          let real_value = JSON.parse(value);
          (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicFirstTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicFirstTerm(0.00);
          (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
          setDragIndexValueAcademicFirstTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
          setDragIndexValueAcademicFirstTerm( 0.00 );
      } else {
          const defaultValue = dataschoolacademicfirsttermdata;
          await set(academic_first_term_value_2023, JSON.stringify(defaultValue) );
          setAcademicFirstTermData(defaultValue);
        }
        const value_question = await get(academic_first_term_questions_2023);
        if (value_question !== undefined) {
          setCurrentQuestionIndexAcademicFirstTerm( value_question );
        }
        else{
          setCurrentQuestionIndexAcademicFirstTerm( 0 );
        }
      }
      ////////////////////////////////////////////////
      if (selectedYearVal === "2022"){
        const value = await get(academic_second_term_value_2022);        
        if (value !== undefined) {
          setAcademicSecondTermData( JSON.parse(value) );
          setGradeAcademicSecondTerm( calculateAcademicGeneralStatus(JSON.parse(value)) );
          let real_value = JSON.parse(value);
          (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicSecondTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicSecondTerm(0.00);
          (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
          setDragIndexValueAcademicSecondTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
          setDragIndexValueAcademicSecondTerm( 0.00 );
        } else {
          const defaultValue = dataschoolacademicfirsttermdata;
          await set(academic_second_term_value_2022, JSON.stringify(defaultValue) );
          setAcademicSecondTermData(defaultValue);
        }
        const value_question = await get(academic_second_term_questions_2022);
        if (value_question !== undefined) {
          setCurrentQuestionIndexAcademicSecondTerm( value_question );
        }
        else{
          setCurrentQuestionIndexAcademicSecondTerm( 0 );
        }
      }
      else if (selectedYearVal === "2023"){
        const value = await get(academic_second_term_value_2023);        
        if (value !== undefined) {
          setAcademicSecondTermData( JSON.parse(value) );
          setGradeAcademicSecondTerm( calculateAcademicGeneralStatus(JSON.parse(value)) );
          let real_value = JSON.parse(value);
          (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicSecondTerm( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicSecondTerm(0.00);
          (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
          setDragIndexValueAcademicSecondTerm( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
          setDragIndexValueAcademicSecondTerm( 0.00 );
        } else {
          const defaultValue = dataschoolacademicfirsttermdata;
          await set(academic_second_term_value_2023, JSON.stringify(defaultValue) );
          setAcademicSecondTermData(defaultValue);
        }
        const value_question = await get(academic_second_term_questions_2023);
        if (value_question !== undefined) {
          setCurrentQuestionIndexAcademicSecondTerm( value_question );
        }
        else{
          setCurrentQuestionIndexAcademicSecondTerm( 0 );
        }
      }
      //////////////////////////////////////////////////////
      if (selectedYearVal === "2022"){
        const value = await get(academic_external_value_2022);        
        if (value !== undefined) {
          setAcademicExternalData( JSON.parse(value) );
          setGradeAcademicExternal( calculateAcademicGeneralStatus(JSON.parse(value)) );
          let real_value = JSON.parse(value);
          (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicExternal( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicExternal(0.00);
          (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
          setDragIndexValueAcademicExternal( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
          setDragIndexValueAcademicExternal( 0.00 );
        } else {
          const defaultValue = dataschoolacademicfirsttermdata;
          await set(academic_external_value_2022, JSON.stringify(defaultValue) );
          setAcademicExternalData(defaultValue);
        }
        const value_question = await get(academic_external_questions_2022);
        if (value_question !== undefined) {
          setCurrentQuestionIndexAcademicExternal( value_question );
        }
        else{
          setCurrentQuestionIndexAcademicExternal( 0 );
        }
      }
      else if (selectedYearVal === "2023"){
        const value = await get(academic_external_value_2023);        
        if (value !== undefined) {
          setAcademicExternalData( JSON.parse(value) );
          setGradeAcademicExternal( calculateAcademicGeneralStatus(JSON.parse(value)) );
          let real_value = JSON.parse(value);
          (real_value[14].value !== null && real_value[0].value !== null) ? (setTransitionIndexValueAcademicExternal( parseFloat( real_value[14].value / real_value[0].value) ) ) : setTransitionIndexValueAcademicExternal(0.00);
          (real_value[8].value !== null &&  real_value[9].value !== null && real_value[10].value  !== null && real_value[1].value  !== null) ? 
          setDragIndexValueAcademicExternal( parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) ) ) :
          setDragIndexValueAcademicExternal( 0.00 );
        } else {
          const defaultValue = dataschoolacademicfirsttermdata;
          await set(academic_external_value_2023, JSON.stringify(defaultValue) );
          setAcademicExternalData(defaultValue);
        }
        const value_question = await get(academic_external_questions_2023);
        if (value_question !== undefined) {
          setCurrentQuestionIndexAcademicExternal( value_question );
        }
        else{
          setCurrentQuestionIndexAcademicExternal( 0 );
        }
      }
      ///////////////////////////////////////
    } catch (err) {
      console.error('Error fetching value from IndexedDB:', err);
    }
  }

  const handleChangeNativeSelectYearTeacher = async (event) => {
    setSelectedYearTeacher(event.currentTarget.value);
    let selectedYearVal = event.currentTarget.value;
    try {
      if (selectedYearVal === "2022" && dataTeacherTab === 'first-term'){
          
          const value = await get(teacher_first_term_value_2022);        
          if (value !== undefined) {
            setTeacherFirstTerm( JSON.parse(value) );
            sumTeacherValues( JSON.parse(value) )            
          }
          else{
            setTeacherFirstTerm( [] );
            resetTeacherValues()
          } 
          const value_question = await get(teacher_first_term_questions_2022);
          if (value_question !== undefined) {
            setTeacherFirstTermIndex( value_question );
          }
          else{
            setTeacherFirstTermIndex( false );
          }
      }
      else if (selectedYearVal === "2023" && dataTeacherTab === 'first-term'){
        const value = await get(teacher_first_term_value_2023);        
        if (value !== undefined) {
          setTeacherFirstTerm( JSON.parse(value) );
          sumTeacherValues( JSON.parse(value) )
        }
        else{
          setTeacherFirstTerm( [] );
          resetTeacherValues()
        }  
        const value_question = await get(teacher_first_term_questions_2023);
        if (value_question !== undefined) {
          setTeacherFirstTermIndex( value_question );
        }
        else{
          setTeacherFirstTermIndex( false );
        }
      }

      if (selectedYearVal === "2022" && dataTeacherTab === 'second-term'){
        const value = await get(teacher_second_term_value_2022);        
        if (value !== undefined) {
          setTeacherSecondTerm( JSON.parse(value) );
          sumTeacherValues( JSON.parse(value) )
        }
        else{
          setTeacherSecondTerm( [] );
          resetTeacherValues()
        } 
        const value_question = await get(teacher_second_term_questions_2022);
        if (value_question !== undefined) {
          setTeacherSecondTermIndex( value_question );
        }
        else{
          setTeacherSecondTermIndex( false );
        }
      }
      else if (selectedYearVal === "2023" && dataTeacherTab === 'second-term'){
        const value = await get(teacher_second_term_value_2023);        
        if (value !== undefined) {
          setTeacherSecondTerm( JSON.parse(value) );
          sumTeacherValues( JSON.parse(value) )
        }
        else{
          setTeacherSecondTerm( [] );
          resetTeacherValues()
        }  
        const value_question = await get(teacher_second_term_questions_2023);
        if (value_question !== undefined) {
          setTeacherSecondTermIndex( value_question );
        }
        else{
          setTeacherSecondTermIndex( false );
        }
      }

      if (selectedYearVal === "2022" && dataTeacherTab === 'third-term'){
        const value = await get(teacher_third_term_value_2022);        
        if (value !== undefined) {
          setTeacherThirdTerm( JSON.parse(value) );
          sumTeacherValues( JSON.parse(value) )
        }
        else{
          setTeacherThirdTerm( [] );
          resetTeacherValues()
        } 
        const value_question = await get(teacher_third_term_questions_2022);
        if (value_question !== undefined) {
          setTeacherThirdTermIndex( value_question );
        }
        else{
          setTeacherThirdTermIndex( false );
        }
      }
      else if (selectedYearVal === "2023" && dataTeacherTab === 'third-term'){
        const value = await get(teacher_third_term_value_2023);        
        if (value !== undefined) {
          setTeacherThirdTerm( JSON.parse(value) );
          sumTeacherValues( JSON.parse(value) )
        }
        else{
          setTeacherThirdTerm( [] );
          resetTeacherValues()
        }  
        const value_question = await get(teacher_third_term_questions_2023);
        if (value_question !== undefined) {
          setTeacherThirdTermIndex( value_question );
        }
        else{
          setTeacherThirdTermIndex( false );
        }
      }
    }
    catch(err){
      console.error('Error fetching value from IndexedDB:', err);
    }
  }

  const teacherTabOnChange = (value) => {
     setTeacherTab(value);
  }

  const handleChangeNativeSelectTeacherLevel = async (event) => {
    setSelectedTeacherLevel(event.currentTarget.value);
    let selectedLevelVal = event.currentTarget.value;
  }

  const validateArrayOfObjects = (arr) => {
    for (let obj of arr) {
      for (let key in obj) {
        if (obj['academic_option'] === "null" && obj['qualification_in_education_option'] === "null"){
          return false;
        }        
        if ( (obj[key] === "" || obj[key] === "null" || obj[key] === null) && (key !== 'qualification_in_education_option' && key !== 'academic_option') ) {
          return false;
        }
        if(obj['qualification_in_education_option'] !== "null" && obj['academic_option'] === "null"){
          delete obj['academic_option'];
        }
        else if(obj['qualification_in_education_option'] === "null" && obj['academic_option'] !== "null"){
          delete obj['qualification_in_education_option'];
        }
      }
    }
    return true;
  }

  const handleChangeNumberInputTeacherNumberFirstTerm = (val) => {
    setSelectedTeacherNumber( val );
    let selectedNumberVal = val;
    let baseValues =  { 
      _year: "",
      key: 0,
      name:  "",
      level_option:    "null",
      trcc_option:     "null",
      academic_option: "null",
      qualification_in_education_option: "null",
      type_of_engagement_option:  "null",
      discipline_option:          "null",
      highest_experience_option:  "null",
    };
    const teacherArray = [];

    for (let i = 1; i <= Number(selectedNumberVal); i++) {
      let teacher = { ...baseValues };
      teacher._year        =  selectedYearTeacher ? selectedYearTeacher : "";
      teacher.level_option =  selectedTeacherLevel ? selectedTeacherLevel : "";
      teacher.name = `Teacher ${i}`;
      teacher.key  = i; 
      teacherArray.push(teacher);
    }

    setTeacherFirstTerm(teacherArray);    
  }

  const handleChangeNumberInputTeacherNumberSecondTerm = (val) => {
    setSelectedTeacherNumber( val );
    let selectedNumberVal = val;
    let baseValues =  { 
      _year: "",
      key: 0,
      name:  "",
      level_option:    "null",
      trcc_option:     "null",
      academic_option: "null",
      qualification_in_education_option: "null",
      type_of_engagement_option:  "null",
      discipline_option:          "null",
      highest_experience_option:  "null",
    };
    const teacherArray = [];

    for (let i = 1; i <= Number(selectedNumberVal); i++) {
      let teacher = { ...baseValues };
      teacher._year        =  selectedYearTeacher ? selectedYearTeacher : "";
      teacher.level_option =  selectedTeacherLevel ? selectedTeacherLevel : "";
      teacher.name = `Teacher ${i}`;
      teacher.key  = i; 
      teacherArray.push(teacher);
    }

    setTeacherSecondTerm(teacherArray);    
  }

  const handleChangeNumberInputTeacherNumberThirdTerm = (val) => {
    setSelectedTeacherNumber( val );
    let selectedNumberVal = val;
    let baseValues =  { 
      _year: "",
      key: 0,
      name:  "",
      level_option:    "null",
      trcc_option:     "null",
      academic_option: "null",
      qualification_in_education_option: "null",
      type_of_engagement_option:  "null",
      discipline_option:          "null",
      highest_experience_option:  "null",
    };
    const teacherArray = [];

    for (let i = 1; i <= Number(selectedNumberVal); i++) {
      let teacher = { ...baseValues };
      teacher._year        =  selectedYearTeacher ? selectedYearTeacher : "";
      teacher.level_option =  selectedTeacherLevel ? selectedTeacherLevel : "";
      teacher.name = `Teacher ${i}`;
      teacher.key  = i; 
      teacherArray.push(teacher);
    }

    setTeacherThirdTerm(teacherArray);    
  }

  const sumTeacherValues = (data) => {
     
      let max_general = data.length * 50;
      let max_premium = data.length * 65;
      
      let count_general_compliance                 = 0;
      let count_premium_compliance                 = 0;
      let count_general_compliance_stem            = 0;
      let count_premium_compliance_stem            = 0;
      let count_general_compliance_arts_science    = 0;
      let count_premium_compliance_arts_science    = 0;

      for (let i = 0; i < data.length; i++) {
        if ( data[i].qualification_in_education_option !== undefined){
          count_premium_compliance += Number(data[i].trcc_option) + Number(data[i].qualification_in_education_option) + Number(data[i].type_of_engagement_option) + Number(data[i].highest_experience_option);
        }
        if (data[i].academic_option !== undefined){
          count_general_compliance += Number(data[i].trcc_option) + Number(data[i].academic_option) + Number(data[i].type_of_engagement_option) + Number(data[i].highest_experience_option);
        }
        if (data[i].qualification_in_education_option !== undefined && data[i].discipline_option === "stem"){
          count_premium_compliance_stem += Number(data[i].trcc_option) + Number(data[i].qualification_in_education_option) + Number(data[i].type_of_engagement_option) + Number(data[i].highest_experience_option);
        }
        if (data[i].academic_option !== undefined && data[i].discipline_option === "stem"){
          count_general_compliance_stem += Number(data[i].trcc_option) + Number(data[i].academic_option) + Number(data[i].type_of_engagement_option) + Number(data[i].highest_experience_option);
        }
        if (data[i].qualification_in_education_option !== undefined && (data[i].discipline_option === "arts" || data[i].discipline_option === "social_science") ){
          count_premium_compliance_arts_science += Number(data[i].trcc_option) + Number(data[i].qualification_in_education_option) + Number(data[i].type_of_engagement_option) + Number(data[i].highest_experience_option);
        }
        if (data[i].academic_option !== undefined && (data[i].discipline_option === "arts" || data[i].discipline_option === "social_science") ){
          count_general_compliance_arts_science += Number(data[i].trcc_option) + Number(data[i].academic_option) + Number(data[i].type_of_engagement_option) + Number(data[i].highest_experience_option);
        }      
      }

      //
      
      if (count_general_compliance > 0){
        setValueGeneralCompliance( parseInt( (count_general_compliance/max_general) * 100 ) );
      }
      if (count_premium_compliance > 0){
        setValueGeneralCompliancePremium( parseInt( (count_premium_compliance/max_premium) * 100 ) );
      }
      if (count_general_compliance_stem > 0){
        setValueStemCompliance( parseInt( (count_general_compliance_stem/max_general) * 100 ) );
      }
      if (count_premium_compliance_stem > 0){
        setValueStemCompliancePremium( parseInt( (count_premium_compliance_stem/max_premium) * 100 ) );
      }
      if (count_general_compliance_arts_science > 0){
        setValueArtsSocialCompliance( parseInt( (count_general_compliance_arts_science/max_general) * 100 ) );
      }
      if (count_premium_compliance_arts_science > 0){
        setValueArtsSocialCompliancePremium( parseInt( (count_premium_compliance_arts_science/max_premium) * 100 ) );
      }
    
  }

  const resetTeacherValues = () => {
    setValueGeneralCompliance(0)
    setValueGeneralCompliancePremium(0)
    setValueStemCompliance(0)
    setValueStemCompliancePremium(0)
    setValueArtsSocialCompliance(0)
    setValueArtsSocialCompliancePremium(0)
  }

  const handleSelectChangeTrccOption = (key, value, setTeacherData) => {
    setTeacherData((prevState) =>
      prevState.map((element) =>
        element.key === key ? { ...element, trcc_option: value } : element
      )
    );
  };

  const handleSelectChangeAcademicBack = (key, value, setTeacherData) => {
    setTeacherData((prevState) =>
      prevState.map((element) =>
        element.key === key ? { ...element, academic_option: value } : element
      )
    );
  };

  const handleSelectChangeQualification = (key, value, setTeacherData) => {
    setTeacherData((prevState) =>
      prevState.map((element) =>
        element.key === key ? { ...element, qualification_in_education_option: value } : element
      )
    );
  };

  const handleSelectTypeOfEngagement = (key, value, setTeacherData) => {
    setTeacherData((prevState) =>
      prevState.map((element) =>
        element.key === key ? { ...element, type_of_engagement_option: value } : element
      )
    );
  };

  const handleSelectDisciplineOption = (key, value, setTeacherData) => {
    setTeacherData((prevState) =>
      prevState.map((element) =>
        element.key === key ? { ...element, discipline_option: value } : element
      )
    );
  };

  const handleSelectHighestExperienceOption = (key, value, setTeacherData) => {
    setTeacherData((prevState) =>
      prevState.map((element) =>
        element.key === key ? { ...element, highest_experience_option: value } : element
      )
    );
  };

  const submitTeacherOptionFirstTerm = async () => {
      if (selectedYearTeacher === "2022"){
        if (dataTeacherFirstTerm.length > 0 && validateArrayOfObjects(dataTeacherFirstTerm) && selectedTeacherLevel !== 'None'){
          await set(teacher_first_term_value_2022, JSON.stringify(dataTeacherFirstTerm) );
          await set(teacher_first_term_questions_2022, true );
          setSelectedTeacherLevel('None');
          setTeacherFirstTermIndex(true)
          sumTeacherValues(dataTeacherFirstTerm)
        }
        else {
          alert("Some values are not yet completed. Complete all the values before proceeding.");
        }
      }
      else if (selectedYearTeacher === "2023"){
        if (dataTeacherFirstTerm.length > 0 && validateArrayOfObjects(dataTeacherFirstTerm) && selectedTeacherLevel !== 'None'){
          await set(teacher_first_term_value_2023, JSON.stringify(dataTeacherFirstTerm) );
          await set(teacher_first_term_questions_2023, true );
          setSelectedTeacherLevel('None');
          setTeacherFirstTermIndex(true)
          sumTeacherValues(dataTeacherFirstTerm)
        }
        else {
          alert("Some values are not yet completed. Complete all the values before proceeding.");
        }
      }      
  }

  const submitTeacherOptionSecondTerm = async () => {
    if (selectedYearTeacher === "2022"){
      if (dataTeacherSecondTerm.length > 0 && validateArrayOfObjects(dataTeacherSecondTerm) && selectedTeacherLevel !== 'None'){
        await set(teacher_second_term_value_2022, JSON.stringify(dataTeacherSecondTerm) );
        await set(teacher_second_term_questions_2022, true );
        setSelectedTeacherLevel('None');
        setTeacherSecondTermIndex(true);    
        sumTeacherValues(dataTeacherSecondTerm)    
      }
      else {
        alert("Some values are not yet completed. Complete all the values before proceeding.");
      }
    }
    else if (selectedYearTeacher === "2023"){
      if (dataTeacherSecondTerm.length > 0 && validateArrayOfObjects(dataTeacherSecondTerm) && selectedTeacherLevel !== 'None'){
        await set(teacher_second_term_value_2023, JSON.stringify(dataTeacherSecondTerm) );
        await set(teacher_second_term_questions_2023, true );
        setSelectedTeacherLevel('None');
        setTeacherSecondTermIndex(true)    
        sumTeacherValues(dataTeacherSecondTerm)    
      }
      else {
        alert("Some values are not yet completed. Complete all the values before proceeding.");
      }
    }      
  }

  const submitTeacherOptionThirdTerm = async () => {
    if (selectedYearTeacher === "2022"){
      if (dataTeacherThirdTerm.length > 0 && validateArrayOfObjects(dataTeacherThirdTerm) && selectedTeacherLevel !== 'None'){
        await set(teacher_third_term_value_2022, JSON.stringify(dataTeacherThirdTerm) );
        await set(teacher_third_term_questions_2022, true );
        setSelectedTeacherLevel('None');
        setTeacherThirdTermIndex(true);
        sumTeacherValues(dataTeacherThirdTerm)        
      }
      else {
        alert("Some values are not yet completed. Complete all the values before proceeding.");
      }
    }
    else if (selectedYearTeacher === "2023"){
      if (dataTeacherThirdTerm.length > 0 && validateArrayOfObjects(dataTeacherThirdTerm) && selectedTeacherLevel !== 'None'){
        await set(teacher_third_term_value_2023, JSON.stringify(dataTeacherThirdTerm) );
        await set(teacher_third_term_questions_2023, true );
        setSelectedTeacherLevel('None');
        setTeacherThirdTermIndex(true) 
        sumTeacherValues(dataTeacherThirdTerm)       
      }
      else {
        alert("Some values are not yet completed. Complete all the values before proceeding.");
      }
    }      
  }

  const calculateDashboardSchoolEvaluation = async () => {
    let standards_coreprocesses_2022, standards_coreprocesses_2023  = 0;
    let standards_instructor_2022   , standards_instructor_2023     = 0;
    let standards_learning_2022     , standards_learning_2023       = 0;
    let standards_total_2022        , standards_total_2023          = 0;
    let standards_sustainability_2022,standards_sustainability_2023 = 0;
    let standards_academic_2022 ,    standards_academic_2023        = 0;
    let standards_sshe_2022 ,        standards_sshe_2023            = 0;
    const value = await get(standards_coreprocesses_value_2022);        
    if (value !== undefined) {
      standards_coreprocesses_2022 = sumValues(JSON.parse(value));
    }
    //////////////////////////////////////////////
    const value2 = await get(standards_instructor_value_2022);        
    if (value2 !== undefined) {
      standards_instructor_2022 = sumValues(JSON.parse(value2));
    }
    /////////////////////////////////////////////
    const value3 = await get(standards_learning_value_2022);        
    if (value3 !== undefined) {      
      standards_learning_2022 = sumValues(JSON.parse(value3));
    }
    /////////////////////////////////////////////
    const value4 = await get(standards_total_value_2022);        
    if (value4 !== undefined) {     
      standards_total_2022 = sumValues(JSON.parse(value4));
    }
    ////////////////////////////////////////////
    const value5 = await get(standards_sustainability_value_2022);        
    if (value5 !== undefined) {
      standards_sustainability_2022 = sumValues(JSON.parse(value5));
    }
    ////////////////////////////////////////////
    const value6 = await get(standards_academic_value_2022);        
    if (value6 !== undefined) {     
      standards_academic_2022 = sumValues(JSON.parse(value6));
    }
    ///////////////////////////////////////////
    const value7 = await get(standards_sshe_value_2022);        
    if (value7 !== undefined) {      
      standards_sshe_2022 = sumValues(JSON.parse(value7));
    }
    //***********************************************//
    const value8 = await get(standards_coreprocesses_value_2023);        
    if (value8 !== undefined) {
      standards_coreprocesses_2023 = sumValues(JSON.parse(value8));
    }
    //////////////////////////////////////////////
    const value9 = await get(standards_instructor_value_2023);        
    if (value9 !== undefined) {
      standards_instructor_2023 = sumValues(JSON.parse(value9));
    }
    /////////////////////////////////////////////
    const value10 = await get(standards_learning_value_2023);        
    if (value10 !== undefined) {      
      standards_learning_2023 = sumValues(JSON.parse(value10));
    }
    /////////////////////////////////////////////
    const value11 = await get(standards_total_value_2023);        
    if (value11 !== undefined) {     
      standards_total_2023 = sumValues(JSON.parse(value11));
    }
    ////////////////////////////////////////////
    const value12 = await get(standards_sustainability_value_2023);        
    if (value12 !== undefined) {
      standards_sustainability_2023 = sumValues(JSON.parse(value12));
    }
    ////////////////////////////////////////////
    const value13 = await get(standards_academic_value_2023);        
    if (value13 !== undefined) {     
      standards_academic_2023 = sumValues(JSON.parse(value13));
    }
    ///////////////////////////////////////////
    const value14 = await get(standards_sshe_value_2023);        
    if (value14 !== undefined) {      
      standards_sshe_2023 = sumValues(JSON.parse(value14));
    }

    const dataDashboard = [
      {
        name: '2022',
        coreprocesses:       standards_coreprocesses_2022 !== 0 ? parseInt( (standards_coreprocesses_2022 / final_total_coreprocesses)  * 10 ) : 0,
        instructor_resource: standards_instructor_2022    !== 0 ? parseInt( (standards_instructor_2022 / final_total_instructor) * 10 ) : 0,
        learning_env:        standards_learning_2022      !== 0 ? parseInt( (standards_learning_2022 / final_total_learning) * 10 ) : 0,
        total_human_dev:     standards_total_2022         !== 0 ? parseInt( (standards_total_2022 / final_total_total) * 10 ) : 0,
        sustainability:    standards_sustainability_2022  !== 0 ? parseInt( (standards_sustainability_2022 / final_total_sustainability) * 10 ) : 0,
        academic:          standards_academic_2022        !== 0 ? parseInt( (standards_academic_2022 / final_total_academic) * 10 ) : 0,
        shes:              standards_sshe_2022            !== 0 ? parseInt( (standards_sshe_2022 / final_total_sshe) * 10 ) : 0,       
      },
      {
        name: '2023',
        coreprocesses:       standards_coreprocesses_2023 !== 0 ? parseInt( (standards_coreprocesses_2023 / final_total_coreprocesses)  * 10 ) : 0,
        instructor_resource: standards_instructor_2023    !== 0 ? parseInt( (standards_instructor_2023 / final_total_instructor) * 10 ) : 0,
        learning_env:        standards_learning_2023      !== 0 ? parseInt( (standards_learning_2023 / final_total_learning) * 10 ) : 0,
        total_human_dev:     standards_total_2023         !== 0 ? parseInt( (standards_total_2023 / final_total_total) * 10 ) : 0,
        sustainability:    standards_sustainability_2023  !== 0 ? parseInt( (standards_sustainability_2023 / final_total_sustainability) * 10 ) : 0,
        academic:          standards_academic_2023        !== 0 ? parseInt( (standards_academic_2023 / final_total_academic) * 10 ) : 0,
        shes:              standards_sshe_2023            !== 0 ? parseInt( (standards_sshe_2023 / final_total_sshe) * 10 ) : 0,       
      },
    ];
    
    setDashboardEvaluation(dataDashboard);
  }

  const calculateDashboardAcademic = async () => {
    let academic_first_term_2022_ti    , academic_first_term_2023_ti      = 0;
    let academic_second_term_2022_ti   , academic_second_term_2023_ti     = 0;
    let academic_third_term_2022_ti    , academic_third_term_2023_ti      = 0;
    
    let academic_first_term_2022_di    , academic_first_term_2023_di      = 0;
    let academic_second_term_2022_di   , academic_second_term_2023_di     = 0;
    let academic_third_term_2022_di    , academic_third_term_2023_di      = 0;

    const value = await get(academic_first_term_value_2022);        
    if (value !== undefined) {
      let real_value = JSON.parse(value);
      academic_first_term_2022_ti = parseFloat( real_value[14].value / real_value[0].value); 
      academic_first_term_2022_di = parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) );
    }
    //////////////////////////////////////////////
    const value2 = await get(academic_second_term_value_2022);        
    if (value2 !== undefined) {
      let real_value = JSON.parse(value2);
      academic_second_term_2022_ti = parseFloat( real_value[14].value / real_value[0].value); 
      academic_second_term_2022_di = parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) );
   }
    /////////////////////////////////////////////
    const value3 = await get(academic_third_term_value_2022);        
    if (value3 !== undefined) {      
      let real_value = JSON.parse(value3);
      academic_third_term_2022_ti = parseFloat( real_value[14].value / real_value[0].value); 
      academic_third_term_2022_di = parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) );
    }
    /////////////////////////////////////////////
    const value4 = await get(academic_first_term_value_2023);        
    if (value4 !== undefined) {     
      let real_value = JSON.parse(value4);
      academic_first_term_2023_ti = parseFloat( real_value[14].value / real_value[0].value); 
      academic_first_term_2023_di = parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) );
    }
    ////////////////////////////////////////////
    const value5 = await get(academic_second_term_value_2023);        
    if (value5 !== undefined) {
      let real_value = JSON.parse(value5);
      academic_second_term_2023_ti = parseFloat( real_value[14].value / real_value[0].value); 
      academic_second_term_2023_di = parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) );
    }
    ////////////////////////////////////////////
    const value6 = await get(academic_third_term_value_2023);        
    if (value6 !== undefined) {     
      let real_value = JSON.parse(value6);
      academic_third_term_2023_ti = parseFloat( real_value[14].value / real_value[0].value); 
      academic_third_term_2023_di = parseFloat( ( Number(real_value[8].value) + Number(real_value[9].value) + Number(real_value[10].value) ) / Number(real_value[1].value) );
    }

    const dataDashboard = [
      {
        name: 'Term 1 - 2022',
        ti: academic_first_term_2022_ti,
        di: academic_first_term_2022_di,  
      },
      {
        name: 'Term 2 - 2022',
        ti: academic_second_term_2022_ti,
        di: academic_second_term_2022_di,   
      },
      {
        name: 'Term 3 - 2022',
        ti: academic_third_term_2022_ti,
        di: academic_third_term_2022_di,   
      },

      {
        name: 'Term 1 - 2023',
        ti: academic_first_term_2023_ti,
        di: academic_first_term_2023_di,  
      },
      {
        name: 'Term 2 - 2023',
        ti: academic_second_term_2023_ti,
        di: academic_second_term_2023_di,   
      },
      {
        name: 'Term 3 - 2023',
        ti: academic_third_term_2023_ti,
        di: academic_third_term_2023_di,   
      },
    ];
    
    setDashboardAcademic(dataDashboard);
  }

 

   /** End Select Button */

  //const currentQuestionTeacherFirstTerm  = dataTeacherFirstTerm[currentQuestionIndexTeacherFirstTerm];
  //**End General Functions */

 /* useEffect(() => {
    const handleContextMenu = (event) => {
      event.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);*/

  useEffect(() => {
    staticCoreProcesses();
    staticInstructorResources();
    staticLearningEnvs();
    staticTotalStudents();
    staticSustainabilities();
    staticAcademics();
    staticSshes();
    staticAcademicAllTerms();
    calculateDashboardSchoolEvaluation();
    calculateDashboardAcademic();

  }, []);

  useEffect(() => {
     const originalConsoleError = console.error;
     console.error = (...args) => {
     if (typeof args [0] === "string" && /defaultProps/.test(args [0])) {
     return;
     }
     originalConsoleError(...args);
     };
     return () => {
     console.error = originalConsoleError;
     };
    }, [])

  //Rows in Table Start
  const rowsFirstTerm =
    dataTeacherFirstTerm.length > 0
      ? dataTeacherFirstTerm.map((element) => (
          <Table.Tr key={element.key}>
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>
              {" "}
              <select
                value={element.trcc_option}
                onChange={(e) =>
                  handleSelectChangeTrccOption(element.key, e.target.value, setTeacherFirstTerm)
                }
                className="custom-select"
              >
                <option value="null">None</option>
                <option value="0">No</option>
                <option value="5">Yes</option>
              </select>
            </Table.Td>
            <Table.Td>
              {""}
              <select
                value={element.academic_option}
                onChange={(e) =>
                  handleSelectChangeAcademicBack(element.key, e.target.value, setTeacherFirstTerm)
                }
                className="custom-select"
              >
                <option value="null">None</option>
                <option value="5">Waec O' Level</option>
                <option value="10">HND</option>
                <option value="15">OND</option>
                <option value="20">Bachelors</option>
                <option value="25">PGD</option>
                <option value="30">Masters</option>
                <option value="35">Doctorate</option>
              </select>
            </Table.Td>
            <Table.Td>
              {""}
              <select
                value={element.qualification_in_education_option}
                onChange={(e) =>
                  handleSelectChangeQualification(element.key, e.target.value, setTeacherFirstTerm)
                }
                className="custom-select"
              >
                <option value="null">None</option>
                <option value="5">Education Certificate</option>
                <option value="20">NCE</option>
                <option value="25">B.Ed</option>
                <option value="30">PGD. Ed</option>
                <option value="35">M.Ed</option>
                <option value="40">PHD. Ed</option>
              </select>
            </Table.Td>
            <Table.Td>
            {""}
            <select
                value={element.type_of_engagement_option}
                onChange={(e) =>
                  handleSelectTypeOfEngagement(element.key, e.target.value, setTeacherFirstTerm)
                }
                className="custom-select"
              >
                <option value="null">None</option>
                <option value="5">Intern</option>
                <option value="5">Part Time</option>
                <option value="10">Permanent</option>
              </select>
            </Table.Td>
            <Table.Td>
            {""}
            <select
                value={element.discipline_option}
                onChange={(e) =>
                  handleSelectDisciplineOption(element.key, e.target.value, setTeacherFirstTerm)
                }
                className="custom-select"
              >
                <option value="null">None</option>
                <option value="stem">STEM</option>
                <option value="arts">Arts</option>
                <option value="social_science">Social Science</option>
              </select>
            </Table.Td>
            <Table.Td>
            {""}
            <select
                value={element.highest_experience_option}
                onChange={(e) =>
                  handleSelectHighestExperienceOption(element.key, e.target.value, setTeacherFirstTerm)
                }
                className="custom-select"
              >
                 <option value="null">None </option>
                 <option value="0">Less than Five years</option>
                 <option value="10">Five years or more</option>
              </select>
            </Table.Td>
          </Table.Tr>
        ))
      : null;

  const rowsSecondTerm =
      dataTeacherSecondTerm.length > 0
        ? dataTeacherSecondTerm.map((element) => (
            <Table.Tr key={element.key}>
              <Table.Td>{element.name}</Table.Td>
              <Table.Td>
                {" "}
                <select
                  value={element.trcc_option}
                  onChange={(e) =>
                    handleSelectChangeTrccOption(element.key, e.target.value, setTeacherSecondTerm)
                  }
                  className="custom-select"
                >
                  <option value="null">None</option>
                  <option value="0">No</option>
                  <option value="5">Yes</option>
                </select>
              </Table.Td>
              <Table.Td>
                {""}
                <select
                  value={element.academic_option}
                  onChange={(e) =>
                    handleSelectChangeAcademicBack(element.key, e.target.value, setTeacherSecondTerm)
                  }
                  className="custom-select"
                >
                  <option value="null">None</option>
                  <option value="5">Waec O' Level</option>
                  <option value="10">HND</option>
                  <option value="15">OND</option>
                  <option value="20">Bachelors</option>
                  <option value="25">PGD</option>
                  <option value="30">Masters</option>
                  <option value="35">Doctorate</option>
                </select>
              </Table.Td>
              <Table.Td>
                {""}
                <select
                  value={element.qualification_in_education_option}
                  onChange={(e) =>
                    handleSelectChangeQualification(element.key, e.target.value, setTeacherSecondTerm)
                  }
                  className="custom-select"
                >
                  <option value="null">None</option>
                  <option value="5">Education Certificate</option>
                  <option value="20">NCE</option>
                  <option value="25">B.Ed</option>
                  <option value="30">PGD. Ed</option>
                  <option value="35">M.Ed</option>
                  <option value="40">PHD. Ed</option>
                </select>
              </Table.Td>
              <Table.Td>
              {""}
              <select
                  value={element.type_of_engagement_option}
                  onChange={(e) =>
                    handleSelectTypeOfEngagement(element.key, e.target.value, setTeacherSecondTerm)
                  }
                  className="custom-select"
                >
                  <option value="null">None</option>
                  <option value="5">Intern</option>
                  <option value="5">Part Time</option>
                  <option value="10">Permanent</option>
                </select>
              </Table.Td>
              <Table.Td>
              {""}
              <select
                  value={element.discipline_option}
                  onChange={(e) =>
                    handleSelectDisciplineOption(element.key, e.target.value, setTeacherSecondTerm)
                  }
                  className="custom-select"
                >
                  <option value="null">None</option>
                  <option value="stem">STEM</option>
                  <option value="arts">Arts</option>
                  <option value="social_science">Social Science</option>
                </select>
              </Table.Td>
              <Table.Td>
              {""}
              <select
                  value={element.highest_experience_option}
                  onChange={(e) =>
                    handleSelectHighestExperienceOption(element.key, e.target.value, setTeacherSecondTerm)
                  }
                  className="custom-select"
                >
                   <option value="null">None </option>
                   <option value="0">Less than Five years</option>
                   <option value="10">Five years or more</option>
                </select>
              </Table.Td>
            </Table.Tr>
          ))
        : null;

  const rowsThirdTerm =
        dataTeacherThirdTerm.length > 0
          ? dataTeacherThirdTerm.map((element) => (
              <Table.Tr key={element.key}>
                <Table.Td>{element.name}</Table.Td>
                <Table.Td>
                  {" "}
                  <select
                    value={element.trcc_option}
                    onChange={(e) =>
                      handleSelectChangeTrccOption(element.key, e.target.value, setTeacherThirdTerm)
                    }
                    className="custom-select"
                  >
                    <option value="null">None</option>
                    <option value="0">No</option>
                    <option value="5">Yes</option>
                  </select>
                </Table.Td>
                <Table.Td>
                  {""}
                  <select
                    value={element.academic_option}
                    onChange={(e) =>
                      handleSelectChangeAcademicBack(element.key, e.target.value, setTeacherThirdTerm)
                    }
                    className="custom-select"
                  >
                    <option value="null">None</option>
                    <option value="5">Waec O' Level</option>
                    <option value="10">HND</option>                    
                    <option value="15">OND</option>
                    <option value="20">Bachelors</option>
                    <option value="25">PGD</option>
                    <option value="30">Masters</option>
                    <option value="35">Doctorate</option>
                  </select>
                </Table.Td>
                <Table.Td>
                  {""}
                  <select
                    value={element.qualification_in_education_option}
                    onChange={(e) =>
                      handleSelectChangeQualification(element.key, e.target.value, setTeacherThirdTerm)
                    }
                    className="custom-select"
                  >
                    <option value="null">None</option>
                    <option value="5">Education Certificate</option>
                    <option value="20">NCE</option>
                    <option value="25">B.Ed</option>
                    <option value="30">PGD. Ed</option>
                    <option value="35">M.Ed</option>
                    <option value="40">PHD. Ed</option>
                  </select>
                </Table.Td>
                <Table.Td>
                {""}
                <select
                    value={element.type_of_engagement_option}
                    onChange={(e) =>
                      handleSelectTypeOfEngagement(element.key, e.target.value, setTeacherThirdTerm)
                    }
                    className="custom-select"
                  >
                    <option value="null">None</option>
                    <option value="5">Intern</option>
                    <option value="5">Part Time</option>
                    <option value="10">Permanent</option>
                  </select>
                </Table.Td>
                <Table.Td>
                {""}
                <select
                    value={element.discipline_option}
                    onChange={(e) =>
                      handleSelectDisciplineOption(element.key, e.target.value, setTeacherThirdTerm)
                    }
                    className="custom-select"
                  >
                    <option value="null">None</option>
                    <option value="stem">STEM</option>
                    <option value="arts">Arts</option>
                    <option value="social_science">Social Science</option>
                  </select>
                </Table.Td>
                <Table.Td>
                {""}
                <select
                    value={element.highest_experience_option}
                    onChange={(e) =>
                      handleSelectHighestExperienceOption(element.key, e.target.value, setTeacherThirdTerm)
                    }
                    className="custom-select"
                  >
                     <option value="null">None </option>
                     <option value="0">Less than Five years</option>
                     <option value="10">Five years or more</option>
                  </select>
                </Table.Td>
              </Table.Tr>
            ))
          : null;
  //Rows in Table End

  return (
    <Container fluid style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      {/*** left side static top */}
      <div
        className="left-evaluation"
        style={{ top: `${childPosition}px` }}
        onMouseDown={handleMouseDown}
      >
       <Table className="rating-table">
          <thead>
            <tr>
              <th colSpan={2} style={{ textAlign: 'center' }}>
                Parametric School Rating (Benchmark)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Curriculum Teaching Processes</td>
              <td> {staticCoreProcess} %</td>
            </tr>
            <tr>
              <td>Teacher / Instructor Resource</td>
              <td> {staticInstructorResource} %</td>
            </tr>
            <tr>
              <td>Learning Environment</td>
              <td> {staticLearningEnv} %</td>
            </tr>
            <tr>
              <td>Total Student Development</td>
              <td> {staticTotalStudent} %</td>
            </tr>
            <tr>
              <td>Sustainability</td>
              <td> {staticSustainability} %</td>
            </tr>
            <tr>
              <td>Academic Performance</td>
              <td> {staticAcademic} %</td>
            </tr>
            <tr>
              <td>Safety, Health, Environment, Security</td>
              <td> {staticSshe} %</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>YEARLY CYCLE</td>
            </tr>
          </tfoot>
       </Table>
      </div>

      {/*** left side static below */}
      <div
        className="left-teacher-asset"
        style={{ top: `${childPositionTwo}px` }}
        onMouseDown={handleMouseDownTwo}
      >
       <Table className="rating-table">
          <thead>
            <tr>
              <th colSpan={2} style={{ textAlign: 'center' }}>
               Teacher Asset Quality Compliance
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>General Compliance</td>
              <td>  %</td>
            </tr>
            <tr>
              <td>General Premium Compliance</td>
              <td>  %</td>
            </tr>
            <tr>
              <td>STEM Compliance</td>
              <td>  %</td>
            </tr>
            <tr>
              <td>STEM Premium Compliance</td>
              <td>  %</td>
            </tr>
            <tr>
              <td>Arts & Social Science Compliance</td>
              <td>  %</td>
            </tr>
            <tr>
              <td>Arts & Social Science Premium Compliance</td>
              <td>  %</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>TERMLY CYCLE</td>
            </tr>
          </tfoot>
       </Table>
      </div>

      {/*** right side static top */}
      <div
        className="right-academic-performance"
        style={{ top: `${childPositionThree}px` }}
        onMouseDown={handleMouseDownThree}
      >
       <Table className="rating-table">
          <thead>
            <tr>
              <th colSpan={2} style={{ textAlign: 'center' }}>
               Academic Performance Parameters
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>General Academic Status</td>
              <td> {valueGradeAcademic} </td>
            </tr>
            <tr>
              <td>Transition Index</td>
              <td> {totalTransitionIndexAcademic}</td>
            </tr>
            <tr>
              <td>Drag Index</td>
              <td> {totalDragIndexAcademic}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>TERMLY CYCLE</td>
            </tr>
          </tfoot>
       </Table>
      </div>

      {/*** right side static bottom */}
      <div
        className="right-curriculum-teaching"
        style={{ top: `${childPositionFour}px` }}
        onMouseDown={handleMouseDownFour}
      >
       <Table className="rating-table">
          <thead>
            <tr>
              <th colSpan={2} style={{ textAlign: 'center' }}>
               Curriculum Teaching Policies Indicators
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Violation (Management)</td>
              <td>  Count</td>
            </tr>
            <tr>
              <td>Violation (Administration)</td>
              <td>  Count</td>
            </tr>
            <tr>
              <td>Assessment Performance</td>
              <td>  Count</td>
            </tr>
            <tr>
              <td>Socio-motor Indicator</td>
              <td>  Count</td>
            </tr>
            <tr>
              <td>Quality Assurance Intervention</td>
              <td>  Count</td>
            </tr>
            <tr>
              <td>Capacity Utilization</td>
              <td>  Count</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2}>WEEKLY CYCLE</td>
            </tr>
          </tfoot>
       </Table>
      </div>  

      <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="center"
        gap="md"
      >
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', position: 'relative', marginTop: '80px' , boxShadow: 'inset 3px 3px 8px rgba(0, 0, 0, 0.4),inset -3px -3px 8px rgba(255, 255, 255, 0.8)'}}>
            <Title align="center" style={{ marginBottom: '10px' }}>Standbasis School Rating + Dashboard</Title>
            <Text align="center" style={{ marginBottom: '20px', fontSize: '18px' }}>Free School Self-service Version</Text>
            <div style={{  backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto', gap: '4px' }}>
              <div onClick={handleDrawerOpenSE} style={{ gridColumn: '1 / 2', backgroundColor: '#4472c4', color: '#fff', padding: '16px', borderRadius: '4px' }}>
                <Text style={{ padding: '10px' }} align="center">School (fundamentals)<br/>Evaluation</Text>
              </div>
              <div onClick={handleDrawerOpenACA} style={{ gridColumn: '2 / 3', backgroundColor: '#4472c4', color: '#fff', padding: '16px', borderRadius: '4px' }}>
                <Text style={{ padding: '10px' }} align="center">Academic Performance<br/>Quality</Text>
              </div>
              <div onClick={handleDrawerOpenTEA} style={{ gridColumn: '1 / 2', backgroundColor: '#4472c4', color: '#fff', padding: '16px', borderRadius: '4px' }}>
                <Text style={{ padding: '10px' }} align="center">Teacher Asset Quality</Text>
              </div>
              <div style={{ gridColumn: '2 / 3', backgroundColor: '#4472c4', color: '#fff', padding: '16px', borderRadius: '4px' }}>
                <Text style={{ padding: '10px' }} align="center">Teaching Processes Indicators</Text>
              </div>
              <Button onClick={handleDrawerOpenModal} style={{ position: 'absolute', backgroundColor: '#002060', top: '66%', left: '50%', transform: 'translate(-50%, -50%)', width: '160px', border: '1px solid white', height: '50px' }}>
                Dashboard
              </Button>
            </div>
        </div>   

        <div style={{  padding: '20px', position: 'relative', marginTop: '10%' }}>
          <Text align="center" style={{  fontSize: '20px', fontWeight: 'bold' }}>Staying on top is a pre-occupation.</Text>
          <Text align="center" style={{  fontSize: '18px', fontWeight: 'lighter' }}>Standards degrade with time. It could take all of 5 years before they manifest in your performance.</Text>
          <Text align="center" style={{  fontSize: '20px', fontWeight: 'bold' }}>Pre-empt the 5-year performance deception.</Text>
          <Text align="center" style={{  fontSize: '18px', fontWeight: 'lighter' }}>Weekly, termly and yearly checks, as the case may be, is best practice!.</Text>     
        </div>        
      </Stack>

      {/***Core processes Start */} 
      <Drawer
        opened={drawerOpenedSE}
        onClose={handleDrawerCloseSE}
        title="School (fundamentals) Evaluation"
        padding="md"
        styles={{
          title: { fontWeight: 700 , fontSize: '20px'}, 
        }}
        size="xl"
      >
        <Container style={{ padding: '5px' }}>
          <NativeSelect
            data={['None','2022', '2023']}
            label="Select School Year"
            description="Pick a year"
            style={{ margin: '20px auto', width: '50%' }}
            onChange={handleChangeNativeSelectYear}
          />
          <Tabs
            color="gray" 
            variant="pills"
            radius="md"
            orientation="vertical"
            defaultValue="core-processes"
            styles={{
              root:  { display: 'flex', alignItems: 'center' },
              list:  { flexShrink: 0, width: '30%', fontWeight: 'bolder', paddingTop: '5px' },
              tab:   { whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' },
              panel: { width: '70%', paddingLeft: '20px', paddingRight: '20px' },
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="core-processes" style={{ color: (dataCoreProcesses.length === currentQuestionIndexCp) && (selectedYear !== 'None') ? 'green' : null }}>Core processes</Tabs.Tab>
              <Tabs.Tab value="instructor-resource" style={{ color: (dataInstructorResource.length === currentQuestionIndexIns) && (selectedYear !== 'None') ? 'green' : null }}>Instructor Resource</Tabs.Tab>
              <Tabs.Tab value="learning-environment" style={{ color: (dataLearningEnv.length === currentQuestionIndexLearn) && (selectedYear !== 'None') ? 'green' : null }}>Learning Environment</Tabs.Tab>
              <Tabs.Tab value="total-student-development" style={{ color: (dataTotalStudent.length === currentQuestionIndexTotal) && (selectedYear !== 'None') ? 'green' : null }}>Total Student Development</Tabs.Tab>
              <Tabs.Tab value="sustainability" style={{ color: (dataSustainability.length === currentQuestionIndexSus) && (selectedYear !== 'None') ? 'green' : null }}>Sustainability</Tabs.Tab>
              <Tabs.Tab value="academic-performance" style={{ color: (dataAcademic.length === currentQuestionIndexAca) && (selectedYear !== 'None') ? 'green' : null }}>Academic Performance</Tabs.Tab>
              <Tabs.Tab value="safety-health-environment-security" style={{ color: (dataSshe.length === currentQuestionIndexSshe) && (selectedYear !== 'None') ? 'green' : null }}>Safety, Health, Environment and Security (SHES) </Tabs.Tab>
            </Tabs.List>  
   
            <Tabs.Panel value="core-processes">
              { selectedYear !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexCp} color={ (dataCoreProcesses.length === currentQuestionIndexCp) && (selectedYear !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataCoreProcesses.length !== currentQuestionIndexCp && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <Radio.Group
                        value={selectedValueCp}
                        onChange={setSelectedValueCp}
                        label={currentQuestionCp.inquiry}
                        description={currentQuestionCp.subarea}
                        withAsterisk
                        styles={{
                          label: { fontSize: 25 }, 
                          description: { fontSize: 12 }                          
                        }}
                      >
                        <Radio value={parseOption(currentQuestionCp.option_one).value} label={parseOption(currentQuestionCp.option_one).label} />
                        <Radio value={parseOption(currentQuestionCp.option_two).value} label={parseOption(currentQuestionCp.option_two).label} />
                        {currentQuestionCp.option_three &&  currentQuestionCp.option_three !== "NULL" && <Radio value={parseOption(currentQuestionCp.option_three).value} label={parseOption(currentQuestionCp.option_three).label} />}
                        {currentQuestionCp.option_four  &&  currentQuestionCp.option_four  !== "NULL" && <Radio value={parseOption(currentQuestionCp.option_four).value} label={parseOption(currentQuestionCp.option_four).label}     />}
                        {currentQuestionCp.option_five  &&  currentQuestionCp.option_five  !== "NULL" && <Radio value={parseOption(currentQuestionCp.option_five).value} label={parseOption(currentQuestionCp.option_five).label}     />}
                      </Radio.Group>
                      <Button onClick={ handleNextCp } disabled={selectedValueCp === null} color={ progressQuestionIndexCp === 100 ? 'green' : null }>
                        { progressQuestionIndexCp === 100 ? "Submit Survey On Core Processes" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataCoreProcesses.length === currentQuestionIndexCp && selectedYear !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        border: `5px solid gray`,
                        borderRadius: '10px',
                        marginTop: '15px'
                      }}
                    >
                      <Text style={{  fontSize: '30px', fontWeight: 'bold' }} size="xl"> { parseInt( (totalValueCp / final_total_coreprocesses)  * 100 ) } %</Text> 
                    </Box>

                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Core Processes </Text> 
                
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="instructor-resource">
            { selectedYear !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexIns} color={ (dataInstructorResource.length === currentQuestionIndexIns) && (selectedYear !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataInstructorResource.length !== currentQuestionIndexIns && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <Radio.Group
                        value={selectedValueIns}
                        onChange={setSelectedValueIns}
                        label={currentQuestionIns.inquiry}
                        description={currentQuestionIns.subarea}
                        withAsterisk
                        styles={{
                          label: { fontSize: 25 }, 
                          description: { fontSize: 12 }                          
                        }}
                      >
                        <Radio value={parseOption(currentQuestionIns.option_one).value} label={parseOption(currentQuestionIns.option_one).label} />
                        <Radio value={parseOption(currentQuestionIns.option_two).value} label={parseOption(currentQuestionIns.option_two).label} />
                        {currentQuestionIns.option_three &&  currentQuestionIns.option_three !== "NULL" && <Radio value={parseOption(currentQuestionIns.option_three).value} label={parseOption(currentQuestionIns.option_three).label} />}
                        {currentQuestionIns.option_four  &&  currentQuestionIns.option_four  !== "NULL" && <Radio value={parseOption(currentQuestionIns.option_four).value} label={parseOption(currentQuestionIns.option_four).label}     />}
                        {currentQuestionIns.option_five  &&  currentQuestionIns.option_five  !== "NULL" && <Radio value={parseOption(currentQuestionIns.option_five).value} label={parseOption(currentQuestionIns.option_five).label}     />}
                      </Radio.Group>
                      <Button onClick={ handleNextIns } disabled={selectedValueIns === null} color={ progressQuestionIndexIns === 100 ? 'green' : null }>
                        { progressQuestionIndexIns === 100 ? "Submit Survey On Instructor Resource" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataInstructorResource.length === currentQuestionIndexIns && selectedYear !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        border: `5px solid gray`,
                        borderRadius: '10px',
                        marginTop: '15px'
                      }}
                    >
                      <Text style={{  fontSize: '30px', fontWeight: 'bold' }} size="xl"> { parseInt( (totalValueIns / final_total_instructor)  * 100 ) } %</Text> 
                    </Box>

                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Instructor Resource </Text> 
                   
                                
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="learning-environment">
            { selectedYear !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexLearn} color={ (dataLearningEnv.length === currentQuestionIndexLearn) && (selectedYear !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataLearningEnv.length !== currentQuestionIndexLearn && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <Radio.Group
                        value={selectedValueLearn}
                        onChange={setSelectedValueLearn}
                        label={currentQuestionLearn.inquiry}
                        description={currentQuestionLearn.subarea}
                        withAsterisk
                        styles={{
                          label: { fontSize: 25 }, 
                          description: { fontSize: 12 }                          
                        }}
                      >
                        <Radio value={parseOption(currentQuestionLearn.option_one).value} label={parseOption(currentQuestionLearn.option_one).label} />
                        <Radio value={parseOption(currentQuestionLearn.option_two).value} label={parseOption(currentQuestionLearn.option_two).label} />
                        {currentQuestionLearn.option_three &&  currentQuestionLearn.option_three !== "NULL" && <Radio value={parseOption(currentQuestionLearn.option_three).value} label={parseOption(currentQuestionLearn.option_three).label} />}
                        {currentQuestionLearn.option_four  &&  currentQuestionLearn.option_four  !== "NULL" && <Radio value={parseOption(currentQuestionLearn.option_four).value} label={parseOption(currentQuestionLearn.option_four).label}     />}
                        {currentQuestionLearn.option_five  &&  currentQuestionLearn.option_five  !== "NULL" && <Radio value={parseOption(currentQuestionLearn.option_five).value} label={parseOption(currentQuestionLearn.option_five).label}     />}
                      </Radio.Group>
                      <Button onClick={ handleNextLearn } disabled={selectedValueLearn === null} color={ progressQuestionIndexLearn === 100 ? 'green' : null }>
                        { progressQuestionIndexLearn === 100 ? "Submit Survey On Learning Environment" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataLearningEnv.length === currentQuestionIndexLearn && selectedYear !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        border: `5px solid gray`,
                        borderRadius: '10px',
                        marginTop: '15px'
                      }}
                    >
                      <Text style={{  fontSize: '30px', fontWeight: 'bold' }} size="xl"> { parseInt( ( totalValueLearn / final_total_learning )  * 100 ) } %</Text> 
                    </Box>

                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Learning Environment </Text> 
                                
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="total-student-development">
            { selectedYear !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexTotal} color={ (dataTotalStudent.length === currentQuestionIndexTotal) && (selectedYear !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataTotalStudent.length !== currentQuestionIndexTotal && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <Radio.Group
                        value={selectedValueTotal}
                        onChange={setSelectedValueTotal}
                        label={currentQuestionTotal.inquiry}
                        description={currentQuestionTotal.subarea}
                        withAsterisk
                        styles={{
                          label: { fontSize: 25 }, 
                          description: { fontSize: 12 }                          
                        }}
                      >
                        <Radio value={parseOption(currentQuestionTotal.option_one).value} label={parseOption(currentQuestionTotal.option_one).label} />
                        <Radio value={parseOption(currentQuestionTotal.option_two).value} label={parseOption(currentQuestionTotal.option_two).label} />
                        {currentQuestionTotal.option_three &&  currentQuestionTotal.option_three !== "NULL" && <Radio value={parseOption(currentQuestionTotal.option_three).value} label={parseOption(currentQuestionTotal.option_three).label} />}
                        {currentQuestionTotal.option_four  &&  currentQuestionTotal.option_four  !== "NULL" && <Radio value={parseOption(currentQuestionTotal.option_four).value}  label={parseOption(currentQuestionTotal.option_four).label}     />}
                        {currentQuestionTotal.option_five  &&  currentQuestionTotal.option_five  !== "NULL" && <Radio value={parseOption(currentQuestionTotal.option_five).value}  label={parseOption(currentQuestionTotal.option_five).label}     />}
                      </Radio.Group>
                      <Button onClick={ handleNextTotal } disabled={selectedValueTotal === null} color={ progressQuestionIndexTotal === 100 ? 'green' : null }>
                        { progressQuestionIndexTotal === 100 ? "Submit Survey On Total Student Development" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataTotalStudent.length === currentQuestionIndexTotal && selectedYear !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        border: `5px solid gray`,
                        borderRadius: '10px',
                        marginTop: '15px'
                      }}
                    >
                      <Text style={{  fontSize: '30px', fontWeight: 'bold' }} size="xl"> { parseInt( ( totalValueTotal / final_total_total )  * 100 ) } %</Text> 
                    </Box>

                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Total Student Development </Text> 
                               
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="sustainability">
            { selectedYear !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexSus} color={ (dataSustainability.length === currentQuestionIndexSus) && (selectedYear !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataSustainability.length !== currentQuestionIndexSus && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <Radio.Group
                        value={selectedValueSus}
                        onChange={setSelectedValueSus}
                        label={currentQuestionSus.inquiry}
                        description={currentQuestionSus.subarea}
                        withAsterisk
                        styles={{
                          label: { fontSize: 25 }, 
                          description: { fontSize: 12 }                          
                        }}
                      >
                        <Radio value={parseOption(currentQuestionSus.option_one).value} label={parseOption(currentQuestionSus.option_one).label} />
                        <Radio value={parseOption(currentQuestionSus.option_two).value} label={parseOption(currentQuestionSus.option_two).label} />
                        {currentQuestionSus.option_three &&  currentQuestionSus.option_three !== "NULL" && <Radio value={parseOption(currentQuestionSus.option_three).value} label={parseOption(currentQuestionSus.option_three).label} />}
                        {currentQuestionSus.option_four  &&  currentQuestionSus.option_four  !== "NULL" && <Radio value={parseOption(currentQuestionSus.option_four).value}  label={parseOption(currentQuestionSus.option_four).label}     />}
                        {currentQuestionSus.option_five  &&  currentQuestionSus.option_five  !== "NULL" && <Radio value={parseOption(currentQuestionSus.option_five).value}  label={parseOption(currentQuestionSus.option_five).label}     />}
                      </Radio.Group>
                      <Button onClick={ handleNextSus } disabled={selectedValueSus === null} color={ progressQuestionIndexSus === 100 ? 'green' : null }>
                        { progressQuestionIndexSus === 100 ? "Submit Survey On Sustainability" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataSustainability.length === currentQuestionIndexSus && selectedYear !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        border: `5px solid gray`,
                        borderRadius: '10px',
                        marginTop: '15px'
                      }}
                    >
                      <Text style={{  fontSize: '30px', fontWeight: 'bold' }} size="xl"> { parseInt( ( totalValueSus / final_total_sustainability )  * 100 ) } %</Text> 
                    </Box>

                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Sustainability </Text> 
                                
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="academic-performance">
            { selectedYear !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexAca} color={ (dataAcademic.length === currentQuestionIndexAca) && (selectedYear !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataAcademic.length !== currentQuestionIndexAca && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <Radio.Group
                        value={selectedValueAca}
                        onChange={setSelectedValueAca}
                        label={currentQuestionAca.inquiry}
                        description={currentQuestionAca.subarea}
                        withAsterisk
                        styles={{
                          label: { fontSize: 25 }, 
                          description: { fontSize: 12 }                          
                        }}
                      >
                        <Radio value={parseOption(currentQuestionAca.option_one).value} label={parseOption(currentQuestionAca.option_one).label} />
                        <Radio value={parseOption(currentQuestionAca.option_two).value} label={parseOption(currentQuestionAca.option_two).label} />
                        {currentQuestionAca.option_three &&  currentQuestionAca.option_three !== "NULL" && <Radio value={parseOption(currentQuestionAca.option_three).value} label={parseOption(currentQuestionAca.option_three).label} />}
                        {currentQuestionAca.option_four  &&  currentQuestionAca.option_four  !== "NULL" && <Radio value={parseOption(currentQuestionAca.option_four).value}  label={parseOption(currentQuestionAca.option_four).label}     />}
                        {currentQuestionAca.option_five  &&  currentQuestionAca.option_five  !== "NULL" && <Radio value={parseOption(currentQuestionAca.option_five).value}  label={parseOption(currentQuestionAca.option_five).label}     />}
                      </Radio.Group>
                      <Button onClick={ handleNextAca } disabled={selectedValueAca === null} color={ progressQuestionIndexAca === 100 ? 'green' : null }>
                        { progressQuestionIndexAca === 100 ? "Submit Survey On Academic Performance" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataAcademic.length === currentQuestionIndexAca && selectedYear !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        border: `5px solid gray`,
                        borderRadius: '10px',
                        marginTop: '15px'
                      }}
                    >
                      <Text style={{  fontSize: '30px', fontWeight: 'bold' }} size="xl"> { parseInt( ( totalValueAca / final_total_academic )  * 100 ) } %</Text> 
                    </Box>

                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Academic Performance </Text> 
                                
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="safety-health-environment-security">
            { selectedYear !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexSshe} color={ (dataSshe.length === currentQuestionIndexSshe) && (selectedYear !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataSshe.length !== currentQuestionIndexSshe && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <Radio.Group
                        value={selectedValueSshe}
                        onChange={setSelectedValueSshe}
                        label={currentQuestionSshe.inquiry}
                        description={currentQuestionSshe.subarea}
                        withAsterisk
                        styles={{
                          label: { fontSize: 25 }, 
                          description: { fontSize: 12 }                          
                        }}
                      >
                        <Radio value={parseOption(currentQuestionSshe.option_one).value} label={parseOption(currentQuestionSshe.option_one).label} />
                        <Radio value={parseOption(currentQuestionSshe.option_two).value} label={parseOption(currentQuestionSshe.option_two).label} />
                        {currentQuestionSshe.option_three &&  currentQuestionSshe.option_three !== "NULL" && <Radio value={parseOption(currentQuestionSshe.option_three).value} label={parseOption(currentQuestionSshe.option_three).label} />}
                        {currentQuestionSshe.option_four  &&  currentQuestionSshe.option_four  !== "NULL" && <Radio value={parseOption(currentQuestionSshe.option_four).value}  label={parseOption(currentQuestionSshe.option_four).label}  />}
                        {currentQuestionSshe.option_five  &&  currentQuestionSshe.option_five  !== "NULL" && <Radio value={parseOption(currentQuestionSshe.option_five).value}  label={parseOption(currentQuestionSshe.option_five).label}  />}
                      </Radio.Group>
                      <Button onClick={ handleNextSshe } disabled={selectedValueSshe === null} color={ progressQuestionIndexSshe === 100 ? 'green' : null }>
                        { progressQuestionIndexSshe === 100 ? "Submit Survey On SSHE" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataSshe.length === currentQuestionIndexSshe && selectedYear !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        border: `5px solid gray`,
                        borderRadius: '10px',
                        marginTop: '15px'
                      }}
                    >
                      <Text style={{  fontSize: '30px', fontWeight: 'bold' }} size="xl"> { parseInt( ( totalValueSshe / final_total_sshe )  * 100 ) } %</Text> 
                    </Box>

                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> S.H.E.S </Text> 
                                
                </Center>
              )}
            </Tabs.Panel>

          </Tabs>
        </Container>
      </Drawer>  
      {/***Core processes End */} 

      {/***Academic Performance */}   
      <Drawer
        opened={drawerOpenedACA}
        onClose={handleDrawerCloseACA}
        title="Academic Performance"
        padding="md"
        styles={{
          title: { fontWeight: 700 , fontSize: '20px'}, 
        }}
        size="xl"
      >
        <Container style={{ padding: '5px' }}>
          <NativeSelect
            data={['None','2022', '2023']}
            label="Select School Year"
            description="Pick a year"
            style={{ margin: '20px auto', width: '50%' }}
            onChange={handleChangeNativeSelectYearAcademic}
          />

          <Tabs
            color="gray" 
            variant="pills"
            radius="md"
            orientation="vertical"
            defaultValue="first-term"
            styles={{
              root:  { display: 'flex', alignItems: 'center' },
              list:  { flexShrink: 0, width: '30%', fontWeight: 'bolder', paddingTop: '5px' },
              tab:   { whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' },
              panel: { width: '70%', paddingLeft: '20px', paddingRight: '20px' },
            }}
          >
            <Tabs.List>
              <Tabs.Tab value="first-term"  style={{ color: (dataAcademicFirstTerm.length === currentQuestionIndexAcademicFirstTerm) && (selectedYearAcademic !== 'None') ? 'green' : null }} >First Term</Tabs.Tab>
              <Tabs.Tab value="second-term" style={{ color: (dataAcademicSecondTerm.length === currentQuestionIndexAcademicSecondTerm) && (selectedYearAcademic !== 'None') ? 'green' : null }} >Second Term</Tabs.Tab>
              <Tabs.Tab value="third-term"  style={{  color: (dataAcademicThirdTerm.length === currentQuestionIndexAcademicThirdTerm) && (selectedYearAcademic !== 'None') ? 'green' : null }}>Third Term</Tabs.Tab>
              <Tabs.Tab value="external"    style={{  color: (dataAcademicExternal.length === currentQuestionIndexAcademicExternal) && (selectedYearAcademic !== 'None') ? 'green' : null }}>External</Tabs.Tab>
         
            </Tabs.List>

            <Tabs.Panel value="first-term">
              { selectedYearAcademic !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexAcademicFirstTerm} color={ (dataAcademicFirstTerm.length === currentQuestionIndexAcademicFirstTerm) && (selectedYearAcademic !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataAcademicFirstTerm.length !== currentQuestionIndexAcademicFirstTerm && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <NumberInput
                        label={currentQuestionAcademicFirstTerm.label}
                        description={currentQuestionAcademicFirstTerm.description}
                        placeholder={currentQuestionAcademicFirstTerm.placeholder}       
                        value={selectedValueAcademicFirstTerm}                 
                        onChange={setSelectedValueAcademicFirstTerm}
                      />
                      <Button onClick={ handleNextAcademicFirstTerm } disabled={selectedValueAcademicFirstTerm === ''} color={ progressQuestionIndexAcademicFirstTerm === 100 ? 'green' : null }>
                        { progressQuestionIndexAcademicFirstTerm === 100 ? "Submit Survey On Academic Performance First Term" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataAcademicFirstTerm.length === currentQuestionIndexAcademicFirstTerm && selectedYearAcademic !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Grade Status: "{valueGradeAcademicFirstTerm}" </Text> 
                
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Transition Index: {totalTransitionIndexAcademicFirstTerm} </Text> 
                      
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Drag Index: { Number(totalDragIndexAcademicFirstTerm).toFixed(3) } </Text> 
                  
                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Academic Performance First Term </Text> 
                
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="second-term">
              { selectedYearAcademic !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexAcademicSecondTerm} color={ (dataAcademicSecondTerm.length === currentQuestionIndexAcademicSecondTerm) && (selectedYearAcademic !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataAcademicSecondTerm.length !== currentQuestionIndexAcademicSecondTerm && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <NumberInput
                        label={currentQuestionAcademicSecondTerm.label}
                        description={currentQuestionAcademicSecondTerm.description}
                        placeholder={currentQuestionAcademicSecondTerm.placeholder}       
                        value={selectedValueAcademicSecondTerm}                 
                        onChange={setSelectedValueAcademicSecondTerm}
                      />
                      <Button onClick={ handleNextAcademicSecondTerm } disabled={selectedValueAcademicSecondTerm === ''} color={ progressQuestionIndexAcademicSecondTerm === 100 ? 'green' : null }>
                        { progressQuestionIndexAcademicSecondTerm === 100 ? "Submit Survey On Academic Performance Second Term" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataAcademicSecondTerm.length === currentQuestionIndexAcademicSecondTerm && selectedYearAcademic !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Grade Status: "{valueGradeAcademicSecondTerm}" </Text> 
                
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Transition Index: {totalTransitionIndexAcademicSecondTerm} </Text> 
                  
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Drag Index: {Number(totalDragIndexAcademicSecondTerm).toFixed(3)} </Text> 
            
                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Academic Performance Second Term </Text> 
                
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="third-term">
              { selectedYearAcademic !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexAcademicThirdTerm} color={ (dataAcademicThirdTerm.length === currentQuestionIndexAcademicThirdTerm) && (selectedYearAcademic !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataAcademicThirdTerm.length !== currentQuestionIndexAcademicThirdTerm && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <NumberInput
                        label={currentQuestionAcademicThirdTerm.label}
                        description={currentQuestionAcademicThirdTerm.description}
                        placeholder={currentQuestionAcademicThirdTerm.placeholder}       
                        value={selectedValueAcademicThirdTerm}                 
                        onChange={setSelectedValueAcademicThirdTerm}
                      />
                      <Button onClick={ handleNextAcademicThirdTerm } disabled={selectedValueAcademicThirdTerm === ''} color={ progressQuestionIndexAcademicThirdTerm === 100 ? 'green' : null }>
                        { progressQuestionIndexAcademicThirdTerm === 100 ? "Submit Survey On Academic Performance Third Term" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataAcademicThirdTerm.length === currentQuestionIndexAcademicThirdTerm && selectedYearAcademic !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Grade Status: "{valueGradeAcademicThirdTerm}" </Text> 
                
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Transition Index: {totalTransitionIndexAcademicThirdTerm} </Text> 
                  
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Drag Index: {Number(totalDragIndexAcademicThirdTerm).toFixed(3)} </Text> 
            
                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Academic Performance Third Term </Text> 
                
                </Center>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="external">
              { selectedYearAcademic !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                <Progress value={progressQuestionIndexAcademicExternal} color={ (dataAcademicExternal.length === currentQuestionIndexAcademicExternal) && (selectedYearAcademic !== 'None') ? 'green' : null } style={{ marginBottom: '30px' }} />
                { dataAcademicExternal.length !== currentQuestionIndexAcademicExternal && (<Center style={{ height: '100%' }}>
                    <Stack spacing="md">
                      <NumberInput
                        label={currentQuestionAcademicExternal.label}
                        description={currentQuestionAcademicExternal.description}
                        placeholder={currentQuestionAcademicExternal.placeholder}       
                        value={selectedValueAcademicExternal}                 
                        onChange={setSelectedValueAcademicExternal}
                      />
                      <Button onClick={ handleNextAcademicExternal } disabled={selectedValueAcademicExternal === ''} color={ progressQuestionIndexAcademicExternal === 100 ? 'green' : null }>
                        { progressQuestionIndexAcademicExternal === 100 ? "Submit Survey On Academic Performance Third Term" : "Next" }
                      </Button>
                    </Stack>
                  </Center>
                )}
              </div>)}

              { dataAcademicExternal.length === currentQuestionIndexAcademicExternal && selectedYearAcademic !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Grade Status: "{valueGradeAcademicExternal}" </Text> 
                
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Transition Index: {totalTransitionIndexAcademicExternal} </Text> 
                  
                    <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Drag Index: {Number(totalDragIndexAcademicExternal).toFixed(3)} </Text> 
            
                    <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Academic Performance External </Text> 
                
                </Center>
              )}
            </Tabs.Panel>

          </Tabs>          
        </Container> 
      </Drawer>
      {/**Academic Performance End */}

      {/***Teacher Asset Start*/}
      <Drawer
        opened={drawerOpenedTEA}
        onClose={handleDrawerCloseTEA}
        title="Teacher Asset Quality"
        padding="md"
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        styles={{
          title: { fontWeight: 700 , fontSize: '20px'}, 
        }}
        size="75%"
      >
        <Container style={{ padding: '5px' }}>
          <NativeSelect
            data={['None','2022', '2023']}
            label="Select School Year"
            description="Pick a year"
            style={{ margin: '20px auto', width: '50%' }}
            onChange={handleChangeNativeSelectYearTeacher}
          />

          <Tabs
            color="gray" 
            variant="pills"
            radius="md"
            orientation="vertical"
            defaultValue="first-term"
            styles={{
              root:  { display: 'flex', alignItems: 'center' },
              list:  { flexShrink: 0, width: '20%', fontWeight: 'bolder', paddingTop: '5px' },
              tab:   { whiteSpace: 'normal', wordWrap: 'break-word', textAlign: 'center' },
              panel: { width: '80%', paddingLeft: '20px', paddingRight: '20px' },
            }}
            onChange={teacherTabOnChange}
          >
            <Tabs.List>
              <Tabs.Tab value="first-term"  >First Term</Tabs.Tab>
              <Tabs.Tab value="second-term" >Second Term</Tabs.Tab>
              <Tabs.Tab value="third-term" >Third Term</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first-term" >
              { dataTeacherFirstTermIndex === false && selectedYearTeacher !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                  <Stack spacing="md">
                    <Group spacing="xs">
                      <NumberInput
                        label="Number of Teachers"
                        placeholder="Enter number of teachers"
                        style={{ flex: 1 }}
                        onChange={handleChangeNumberInputTeacherNumberFirstTerm}
                      />
                      <NativeSelect
                        data={['None', 'Primary', 'Secondary']}
                        label="Level Of Teachers"
                        placeholder="Select option"
                        style={{ flex: 1 }}
                        onChange={handleChangeNativeSelectTeacherLevel}
                      />
                    </Group> 
                    <Text style={{ marginTop: '2px',fontWeight: 'bold', textAlign: 'left', fontStyle: 'italic', opacity: 0.7  }} size="sm"> <span style={{ color: 'red' }}> * </span> required </Text> 
                    <Text style={{ marginTop: '2px',fontWeight: 'bold', textAlign: 'left', fontStyle: 'italic', opacity: 0.7 }} size="sm"> <span style={{ color: 'brown' }}> * </span> mutually exclusive </Text>                   
                    <Table.ScrollContainer minWidth={500}>
                      <Table striped highlightOnHover withTableBorder withColumnBorders>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Name <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Teacher Registration Council <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Academic Qualification <span style={ {color: 'brown'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Qualification in Education <span style={ {color: 'brown'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Type of Engagement <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Discipline Option <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Years of Experience On Current Qualification <span style={ {color: 'red'} } className='myasterisk'> * </span> </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {rowsFirstTerm}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>

                    <Button onClick={ submitTeacherOptionFirstTerm } disabled={validateArrayOfObjects(dataTeacherFirstTerm) === false} color={ 'green' }>
                       {"Submit Teacher Evaluation"}
                    </Button>
                  </Stack>                
              </div>)}     

               { dataTeacherFirstTermIndex === true && selectedYearTeacher !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <div style={{ textAlign: 'left', textJustify: 'inter-word', marginTop: '20px' }}>
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> General Compliance: {valueGeneralCompliance} %</Text> 
                  
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> General Premium Compliance: {valueGeneralCompliancePremium} %</Text> 
                    
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> STEM Compliance: {valueStemCompliance} %</Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> STEM Premium Compliance: {valueStemCompliancePremium} %</Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Arts & Social Science Compliance: {valueArtsSocialCompliance} % </Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Arts & Social Science Premium Compliance: {valueArtsSocialCompliancePremium} % </Text> 
                
                      <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Teacher Asset Quality First Term </Text> 
                    </div>
                </Center>
              )}         
            </Tabs.Panel>

            <Tabs.Panel value="second-term">
              { dataTeacherSecondTermIndex === false && selectedYearTeacher !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                  <Stack spacing="md">
                    <Group spacing="xs">
                      <NumberInput
                        label="Number of Teachers"
                        placeholder="Enter number of teachers"
                        style={{ flex: 1 }}
                        onChange={handleChangeNumberInputTeacherNumberSecondTerm}
                      />
                      <NativeSelect
                        data={['None', 'Primary', 'Secondary']}
                        label="Level Of Teachers"
                        placeholder="Select option"
                        style={{ flex: 1 }}
                        onChange={handleChangeNativeSelectTeacherLevel}
                      />
                    </Group> 
                    <Text style={{ marginTop: '2px',fontWeight: 'bold', textAlign: 'left', fontStyle: 'italic', opacity: 0.7  }} size="sm"> <span style={{ color: 'red' }}> * </span> required </Text> 
                    <Text style={{ marginTop: '2px',fontWeight: 'bold', textAlign: 'left', fontStyle: 'italic', opacity: 0.7 }} size="sm"> <span style={{ color: 'brown' }}> * </span> mutually exclusive </Text>                   
                    <Table.ScrollContainer minWidth={500}>
                      <Table striped highlightOnHover withTableBorder withColumnBorders>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Name <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Teacher Registration Council <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Academic Qualification <span style={ {color: 'brown'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Qualification in Education <span style={ {color: 'brown'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Type of Engagement <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Discipline Option <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Years of Experience On Current Qualification <span style={ {color: 'red'} } className='myasterisk'> * </span> </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {rowsSecondTerm}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>

                    <Button onClick={ submitTeacherOptionSecondTerm } disabled={validateArrayOfObjects(dataTeacherSecondTerm) === false} color={ 'green' }>
                       {"Submit Teacher Evaluation"}
                    </Button>
                  </Stack>                
              </div>)}     

               { dataTeacherSecondTermIndex === true && selectedYearTeacher !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    
                    <div style={{ textAlign: 'left', textJustify: 'inter-word', marginTop: '20px' }}>
                      <Text style={{ display: 'flex',  marginTop: '5px', fontSize: '20px', fontWeight: 'bold', alignItems: 'start'}} size="md"> General Compliance: {valueGeneralCompliance} %</Text> 
                  
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> General Premium Compliance: {valueGeneralCompliancePremium} %</Text> 
                    
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> STEM Compliance: {valueStemCompliance} %</Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> STEM Premium Compliance: {valueStemCompliancePremium} %</Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Arts & Social Science Compliance: {valueArtsSocialCompliance} % </Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Arts & Social Science Premium Compliance: {valueArtsSocialCompliancePremium} % </Text> 
                
                      <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Teacher Asset Quality Second Term </Text> 
                    </div>

                </Center>
              )}         
            </Tabs.Panel>

            <Tabs.Panel value="third-term">
              { dataTeacherThirdTermIndex === false && selectedYearTeacher !== 'None' && 
              (<div style={{ textAlign: 'center' }}>
                  <Stack spacing="md">
                    <Group spacing="xs">
                      <NumberInput
                        label="Number of Teachers"
                        placeholder="Enter number of teachers"
                        style={{ flex: 1 }}
                        onChange={handleChangeNumberInputTeacherNumberThirdTerm}
                      />
                      <NativeSelect
                        data={['None', 'Primary', 'Secondary']}
                        label="Level Of Teachers"
                        placeholder="Select option"
                        style={{ flex: 1 }}
                        onChange={handleChangeNativeSelectTeacherLevel}
                      />
                    </Group> 
                    <Text style={{ marginTop: '2px',fontWeight: 'bold', textAlign: 'left', fontStyle: 'italic', opacity: 0.7  }} size="sm"> <span style={{ color: 'red' }}> * </span> required </Text> 
                    <Text style={{ marginTop: '2px',fontWeight: 'bold', textAlign: 'left', fontStyle: 'italic', opacity: 0.7 }} size="sm"> <span style={{ color: 'brown' }}> * </span> mutually exclusive </Text>                   
                    <Table.ScrollContainer minWidth={500}>
                      <Table striped highlightOnHover withTableBorder withColumnBorders>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Name <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Teacher Registration Council <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Academic Qualification <span style={ {color: 'brown'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Qualification in Education <span style={ {color: 'brown'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Type of Engagement <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Discipline Option <span style={ {color: 'red'} } className='myasterisk'> * </span></Table.Th>
                            <Table.Th>Years of Experience On Current Qualification <span style={ {color: 'red'} } className='myasterisk'> * </span> </Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                          {rowsThirdTerm}
                        </Table.Tbody>
                      </Table>
                    </Table.ScrollContainer>

                    <Button onClick={ submitTeacherOptionThirdTerm } disabled={validateArrayOfObjects(dataTeacherThirdTerm) === false} color={ 'green' }>
                       {"Submit Teacher Evaluation"}
                    </Button>
                  </Stack>                
              </div>)}     

               { dataTeacherThirdTermIndex === true && selectedYearTeacher !== 'None' &&  ( <Center style={{ flexDirection: 'column', padding: '20px', alignItems: 'space-between' }}>
                  <Text size="xl" mb="md">
                    Your survey has been completed in this section
                  </Text>
                  
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        backgroundColor: 'green'
                      }}
                    >
                      <IconCheck size={64} strokeWidth={4} color="white" />
                    </Box>
                    <div style={{ textAlign: 'left', textJustify: 'inter-word', marginTop: '20px' }}>
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> General Compliance: {valueGeneralCompliance} %</Text> 
                  
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> General Premium Compliance: {valueGeneralCompliancePremium} %</Text> 
                    
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> STEM Compliance: {valueStemCompliance} %</Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> STEM Premium Compliance: {valueStemCompliancePremium} %</Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Arts & Social Science Compliance: {valueArtsSocialCompliance} % </Text> 
              
                      <Text style={{ marginTop: '5px', fontSize: '20px', fontWeight: 'bold'}} size="md"> Arts & Social Science Premium Compliance: {valueArtsSocialCompliancePremium} % </Text> 
                
                      <Text style={{ marginTop: '20px', fontSize: '30px', fontWeight: 'bold', color: 'green' }} size="md"> Teacher Asset Quality Third Term </Text> 
                    </div>
                    
                </Center>
              )}         
            </Tabs.Panel>

          </Tabs>

        </Container> 
      </Drawer>
      {/***Teacher Asset Quality End */}

      {/***Dashboard Start */}
      <Modal
        opened={modalOpened}
        onClose={handleDrawerCloseModal}
        title="This is a dashboard modal for all the data within the app"
        fullScreen
        styles={{
          title: { fontWeight: 700 , fontSize: '20px'}, 
        }}
        radius={0}
        transitionProps={{ transition: 'fade', duration: 200 }}
      >
        
         {/*  */}

                  <Stack gap="lg" h={600}>
                      <Text style={{ marginTop: '4px',fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic', opacity: 0.7 }} size="md"> School Evaluation </Text>                   
                      
                      <ResponsiveContainer width="100%" height="50%">
                        <BarChart 
                          data={dataDashboardEvaluation}
                          margin={{
                            top: 5,
                            bottom: 5
                          }}                          
                        >
                          <CartesianGrid strokeDasharray="2 2" />
                          <Tooltip />
                          <XAxis dataKey="name" />
                          <YAxis />                          
                          <Legend />
                          <Bar dataKey="coreprocesses"       fill="#17a2b8" />
                          <Bar dataKey="instructor_resource" fill="#1e1e1e" />
                          <Bar dataKey="learning_env"        fill="#28c76f" />
                          <Bar dataKey="total_human_dev"     fill="#ff9f43" />
                          <Bar dataKey="sustainability"      fill="#7367f0" />
                          <Bar dataKey="academic"            fill="#ea5455" />
                          <Bar dataKey="shes"                fill="#ffc107" />                         
                        </BarChart>
                      </ResponsiveContainer>

                      <Text style={{ marginTop: '4px',fontWeight: 'bold', textAlign: 'center', fontStyle: 'italic', opacity: 0.7 }} size="md"> Academic Performance </Text>                   
                     
                      <ResponsiveContainer width="100%" height="50%">
                        <BarChart 
                          data={dataDashboardAcademic}
                          margin={{
                            top: 5,
                            bottom: 5
                          }}                          
                        >
                          <CartesianGrid strokeDasharray="2 2" />
                          <Tooltip />
                          <XAxis dataKey="name" />
                          <YAxis />                          
                          <Legend />
                          <Bar dataKey="ti"       fill="#28c76f" />
                          <Bar dataKey="di"       fill="#1e1e1e" />                       
                        </BarChart>
                      </ResponsiveContainer>
                   
                  </Stack>
            
      </Modal>
      {/***Dashboard End  */}
    </Container>
  );
}

    {/*<svg className="line" width="100%" height="100%">
        <path
          id="connecting-line"
          d={`M 220 ${childPositionTwo + 25} L 400 650`}
          stroke="black"
          fill="transparent"
        />
        <circle className="electron" r="3">
          <animateMotion repeatCount="indefinite" dur="2s">
            <mpath href="#connecting-line" />
          </animateMotion>
        </circle>
      </svg>*/}
export default App;
