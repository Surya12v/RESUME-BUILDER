import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import { 
  Row, 
  Col, 
  Card, 
  Input, 
  Button, 
  Space, 
  Typography, 
  Tag, 
  Form,
  Progress,
  Divider,
  Avatar,
  Steps
} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ResumeEditor = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    cityState: '',
    country: ''
  });

  const [experiences, setExperiences] = useState([{
    jobTitle: '',
    employer: '',
    startDate: '',
    endDate: '',
    description: ''
  }]);

  const [educations, setEducations] = useState([{
    school: '',
    degree: '',
    startDate: '',
    endDate: ''
  }]);

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [currentSection, setCurrentSection] = useState(0);
  const [editorWidth, setEditorWidth] = useState(400); // reduced initial width
  const [customSections, setCustomSections] = useState([]);
  const [newCustomSection, setNewCustomSection] = useState({
    title: '',
    content: ''
  });

  const sections = [
    { title: 'Personal Details', key: 'personal' },
    { title: 'Experience', key: 'experience' },
    { title: 'Education', key: 'education' },
    { title: 'Skills', key: 'skills' },
    { title: 'Custom Sections', key: 'custom' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addExperience = () => {
    setExperiences([...experiences, {
      jobTitle: '',
      employer: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const removeExperience = (index) => {
    if (experiences.length > 1) {
      const newExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(newExperiences);
    }
  };

  const updateExperience = (index, field, value) => {
    const newExperiences = [...experiences];
    newExperiences[index][field] = value;
    setExperiences(newExperiences);
  };

  const addEducation = () => {
    setEducations([...educations, {
      school: '',
      degree: '',
      startDate: '',
      endDate: ''
    }]);
  };

  const removeEducation = (index) => {
    if (educations.length > 1) {
      const newEducations = educations.filter((_, i) => i !== index);
      setEducations(newEducations);
    }
  };

  const updateEducation = (index, field, value) => {
    const newEducations = [...educations];
    newEducations[index][field] = value;
    setEducations(newEducations);
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const onResize = (event, { size }) => {
    setEditorWidth(size.width);
  };

  const handleDownload = async (type) => {
    const element = document.getElementById('resume-preview');
    if (!element) return;

    if (type === 'pdf') {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    } else {
      // PNG download
      const canvas = await html2canvas(element);
      const link = document.createElement('a');
      link.download = 'resume.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const addCustomSection = () => {
    if (newCustomSection.title.trim() && newCustomSection.content.trim()) {
      setCustomSections([...customSections, { ...newCustomSection }]);
      setNewCustomSection({ title: '', content: '' });
    }
  };

  const renderSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <>
            <Title level={4}>Personal details</Title>
            <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
              Users who added phone number and email received 64% more positive feedback from recruiters
            </Text>
            {/* Personal details form */}
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Job Title">
                    <Input 
                      placeholder="The role you want"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Photo">
                    <Button block disabled>
                      This template doesn't support photo upload
                    </Button>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="First Name">
                    <Input
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Last Name">
                    <Input
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email">
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone">
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Address">
                <Input
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="City / State">
                    <Input
                      value={formData.cityState}
                      onChange={(e) => handleInputChange('cityState', e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Country">
                    <Input
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Button type="link" style={{ padding: 0, marginBottom: 24 }}>
                Add more details ˅
              </Button>
            </Form>
          </>
        );
      case 1:
        return (
          <>
            <Title level={4}>Employment History</Title>
            
            {experiences.map((exp, index) => (
              <Card 
                key={index} 
                style={{ marginBottom: 16 }}
                extra={experiences.length > 1 && (
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => removeExperience(index)}
                  />
                )}
              >
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Job Title">
                        <Input
                          placeholder="e.g. Software Developer"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(index, 'jobTitle', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Employer">
                        <Input
                          placeholder="e.g. Google"
                          value={exp.employer}
                          onChange={(e) => updateExperience(index, 'employer', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Start Date">
                        <Input
                          placeholder="e.g. Aug 2023"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="End Date">
                        <Input
                          placeholder="e.g. May 2024"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Form.Item label="Description">
                    <TextArea
                      placeholder="Describe your responsibilities and achievements..."
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={4}
                    />
                  </Form.Item>
                </Form>
              </Card>
            ))}
            
            <Button block type="dashed" onClick={addExperience} icon={<PlusOutlined />}>
              Add employment
            </Button>
          </>
        );
      case 2:
        return (
          <>
            <Title level={4}>Education</Title>
            
            {educations.map((edu, index) => (
              <Card 
                key={index} 
                style={{ marginBottom: 16 }}
                extra={educations.length > 1 && (
                  <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />}
                    onClick={() => removeEducation(index)}
                  />
                )}
              >
                <Form layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="School">
                        <Input
                          placeholder="e.g. Harvard University"
                          value={edu.school}
                          onChange={(e) => updateEducation(index, 'school', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Degree">
                        <Input
                          placeholder="e.g. Bachelor of Science"
                          value={edu.degree}
                          onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item label="Start Date">
                        <Input
                          placeholder="e.g. 2020"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="End Date">
                        <Input
                          placeholder="e.g. 2024"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            ))}
            
            <Button block type="dashed" onClick={addEducation} icon={<PlusOutlined />}>
              Add education
            </Button>
          </>
        );
      case 3:
        return (
          <>
            <Title level={4}>Skills</Title>
            <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
              Choose 5 important skills that show you fit the position.
            </Text>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
              {skills.map((skill, index) => (
                <Tag key={index} color="#1890ff" closable onClose={() => removeSkill(index)}>
                  {skill}
                </Tag>
              ))}
            </div>
            
            <Form.Item>
              <Input
                placeholder="Add a skill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </Form.Item>
            
            <Button type="primary" onClick={addSkill} style={{ width: '100%' }}>
              Add Skill
            </Button>
          </>
        );
      case 4:
        return (
          <>
            <Title level={4}>Custom Sections</Title>
            <Text type="secondary" style={{ marginBottom: 16, display: 'block' }}>
              Add any additional sections you'd like to include in your resume
            </Text>
            
            {customSections.map((section, index) => (
              <Card key={index} style={{ marginBottom: 16 }}>
                <Text strong>{section.title}</Text>
                <Paragraph>{section.content}</Paragraph>
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={() => {
                    setCustomSections(customSections.filter((_, i) => i !== index));
                  }}
                />
              </Card>
            ))}
            
            <Form layout="vertical">
              <Form.Item label="Section Title">
                <Input
                  value={newCustomSection.title}
                  onChange={(e) => setNewCustomSection({
                    ...newCustomSection,
                    title: e.target.value
                  })}
                  placeholder="e.g. Achievements, Certifications"
                />
              </Form.Item>
              <Form.Item label="Content">
                <TextArea
                  rows={4}
                  value={newCustomSection.content}
                  onChange={(e) => setNewCustomSection({
                    ...newCustomSection,
                    content: e.target.value
                  })}
                  placeholder="Add your content here"
                />
              </Form.Item>
              <Button type="primary" onClick={addCustomSection}>
                Add Custom Section
              </Button>
            </Form>
          </>
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const handleBack = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '100%', margin: '0 auto', padding: 24 }}>
      <Row gutter={24} wrap={false}>
        <Resizable
          width={editorWidth}
          height={0}
          onResize={onResize}
          draggableOpts={{ grid: [10, 10] }}
          minConstraints={[300, 0]}
          maxConstraints={[600, 0]}
          handle={
            <div
              style={{
                width: 5,
                height: '100%',
                position: 'absolute',
                right: -2,
                top: 0,
                cursor: 'col-resize',
                background: '#f0f0f0',
                zIndex: 1
              }}
            />
          }
        >
          <Col style={{ width: editorWidth, position: 'relative' }}>
            <Card>
              {/* Progress section */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                <Space>
                  <Progress type="circle" percent={72} width={32} />
                  <Text>Your resume score</Text>
                  <Tag color="success">+10% Add job title</Tag>
                </Space>
              </div>

              {/* Section Navigation */}
              <div style={{ marginBottom: 24 }}>
                <Steps size="small" current={currentSection}>
                  {sections.map((section, index) => (
                    <Steps.Step key={section.key} title={section.title} />
                  ))}
                </Steps>
              </div>

              {/* Current Section Content */}
              {renderSection()}

              {/* Navigation Buttons */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginTop: 24,
                borderTop: '1px solid #f0f0f0',
                paddingTop: 24
              }}>
                <Button 
                  onClick={handleBack}
                  disabled={currentSection === 0}
                  icon={<LeftOutlined />}
                >
                  Back
                </Button>
                <Button 
                  type="primary"
                  onClick={handleNext}
                  disabled={currentSection === sections.length - 1}
                  icon={<RightOutlined />}
                >
                  Next
                </Button>
              </div>
            </Card>
          </Col>
        </Resizable>

        {/* Preview Panel - Made wider */}
        <Col flex="auto" style={{ minWidth: 500 }}>
          <Card 
            extra={
              <Space>
                <Button onClick={() => handleDownload('png')}>
                  Download PNG
                </Button>
                <Button type="primary" onClick={() => handleDownload('pdf')}>
                  Download PDF
                </Button>
              </Space>
            }
          >
            <div id="resume-preview" style={{ backgroundColor: '#f8f9fa', padding: 16, borderRadius: 6, minHeight: 600 }}>
              {/* Header Section */}
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Avatar size={64} style={{ backgroundColor: '#1890ff' }}>
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </Avatar>
                <Title level={4} style={{ marginTop: 8, marginBottom: 4 }}>
                  {formData.firstName} {formData.lastName}
                </Title>
                <Text strong>{formData.jobTitle || 'Job Title'}</Text>
                <br />
                <Text type="secondary">
                  {formData.email} | {formData.phone}
                </Text>
                <br />
                <Text type="secondary">{formData.address}</Text>
              </div>

              {/* Experience Section */}
              {experiences.some(exp => exp.jobTitle || exp.employer) && (
                <>
                  <Divider orientation="left">
                    <Text strong>EMPLOYMENT HISTORY</Text>
                  </Divider>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {experiences.map((exp, index) => (
                      exp.jobTitle || exp.employer ? (
                        <Card key={index} size="small" bordered={false}>
                          <Text strong>{exp.jobTitle} {exp.employer && `at ${exp.employer}`}</Text>
                          <br />
                          <Text type="secondary">{exp.startDate} - {exp.endDate}</Text>
                          {exp.description && (
                            <Paragraph style={{ marginTop: 8 }}>{exp.description}</Paragraph>
                          )}
                        </Card>
                      ) : null
                    ))}
                  </Space>
                </>
              )}

              {/* Education Section */}
              {educations.some(edu => edu.school || edu.degree) && (
                <>
                  <Divider orientation="left">
                    <Text strong>EDUCATION</Text>
                  </Divider>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {educations.map((edu, index) => (
                      edu.school || edu.degree ? (
                        <Card key={index} size="small" bordered={false}>
                          <Text strong>{edu.degree} {edu.school && `at ${edu.school}`}</Text>
                          <br />
                          <Text type="secondary">{edu.startDate} - {edu.endDate}</Text>
                        </Card>
                      ) : null
                    ))}
                  </Space>
                </>
              )}

              {/* Skills Section */}
              {skills.length > 0 && (
                <>
                  <Divider orientation="left">
                    <Text strong>TECHNICAL SKILLS</Text>
                  </Divider>
                  <Card size="small" bordered={false}>
                    {skills.map((skill, index) => (
                      <Tag key={index} color="blue" style={{ margin: '0 8px 8px 0' }}>
                        {skill}
                      </Tag>
                    ))}
                  </Card>
                </>
              )}

              {/* Custom Sections */}
              {customSections.length > 0 && (
                <>
                  {customSections.map((section, index) => (
                    <React.Fragment key={index}>
                      <Divider orientation="left">
                        <Text strong>{section.title.toUpperCase()}</Text>
                      </Divider>
                      <Card size="small" bordered={false}>
                        <Paragraph>{section.content}</Paragraph>
                      </Card>
                    </React.Fragment>
                  ))}
                </>
              )}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ResumeEditor;