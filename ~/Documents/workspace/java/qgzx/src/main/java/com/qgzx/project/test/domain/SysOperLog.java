package com.qgzx.project/test.domain;
import java.math.BigInteger;
import java.util.Date;
import com.qgzx.framework.web.domain.BaseEntity;
import com.ftrybe.staff.core.validator.groups.DefaultGroup;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *sys_oper_log
 *操作日志记录
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "操作日志记录",description = "操作日志记录")
public class SysOperLog extends BaseEntity{
    /**
    *业务类型（0其它 1新增 2修改 3删除）
    */
    @ApiModelProperty(value = "业务类型（0其它 1新增 2修改 3删除），长度为：10 ",position = 1)
    private Long businessType;

    /**
    *错误消息
    */
    @ApiModelProperty(value = "错误消息，长度为：2000 ",position = 2)
    @Size(max = 2000, groups = {DefaultGroup.class})
    private String errorMsg;

    /**
    *返回参数
    */
    @ApiModelProperty(value = "返回参数，长度为：2000 ",position = 3)
    @Size(max = 2000, groups = {DefaultGroup.class})
    private String jsonResult;

    /**
    *方法名称
    */
    @ApiModelProperty(value = "方法名称，长度为：100 ",position = 4)
    @Size(max = 100, groups = {DefaultGroup.class})
    private String method;

    /**
    *日志主键
    */
    @ApiModelProperty(value = "日志主键，长度为：19 ",position = 5)
    private BigInteger operId;

    /**
    *主机地址
    */
    @ApiModelProperty(value = "主机地址，长度为：50 ",position = 6)
    @Size(max = 50, groups = {DefaultGroup.class})
    private String operIp;

    /**
    *操作地点
    */
    @ApiModelProperty(value = "操作地点，长度为：255 ",position = 7)
    @Size(max = 255, groups = {DefaultGroup.class})
    private String operLocation;

    /**
    *操作人员
    */
    @ApiModelProperty(value = "操作人员，长度为：50 ",position = 8)
    @Size(max = 50, groups = {DefaultGroup.class})
    private String operName;

    /**
    *请求参数
    */
    @ApiModelProperty(value = "请求参数，长度为：2000 ",position = 9)
    @Size(max = 2000, groups = {DefaultGroup.class})
    private String operParam;

    /**
    *操作时间
    */
    @ApiModelProperty(value = "操作时间，长度为：0 ",position = 10)
    private Date operTime;

    /**
    *请求URL
    */
    @ApiModelProperty(value = "请求URL，长度为：255 ",position = 11)
    @Size(max = 255, groups = {DefaultGroup.class})
    private String operUrl;

    /**
    *操作类别（0其它 1后台用户 2手机端用户）
    */
    @ApiModelProperty(value = "操作类别（0其它 1后台用户 2手机端用户），长度为：10 ",position = 12)
    private Long operatorType;

    /**
    *机构名称
    */
    @ApiModelProperty(value = "机构名称，长度为：50 ",position = 13)
    @Size(max = 50, groups = {DefaultGroup.class})
    private String orgName;

    /**
    *请求方式
    */
    @ApiModelProperty(value = "请求方式，长度为：10 ",position = 14)
    @Size(max = 10, groups = {DefaultGroup.class})
    private String requestMethod;

    /**
    *操作状态（0正常 1异常）
    */
    @ApiModelProperty(value = "操作状态（0正常 1异常），长度为：10 ",position = 15)
    private Long status;

    /**
    *模块标题
    */
    @ApiModelProperty(value = "模块标题，长度为：50 ",position = 16)
    @Size(max = 50, groups = {DefaultGroup.class})
    private String title;

}