package com.qgzx.project/test.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.qgzx.project/test.domain.SysOperLog;
import com.qgzx.project/test.mapper.SysOperLogMapper;
import com.qgzx.project/test.service.SysOperLogService;
import com.qgzx.framework.service.BaseServiceImpl;

@Service("sysOperLogService")
public class SysOperLogServiceImpl extends BaseServiceImpl<SysOperLogMapper,SysOperLog> implements SysOperLogService {
}